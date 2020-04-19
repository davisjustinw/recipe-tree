class ConnectionsController < ApplicationController
  include ErrorMessage
  include Serializers

  def index
    redirect_if_not_logged_in
    user = User.find_by(id: params[:id])
    connections = user.connections
    render connection_json(connections)
  end

  def show
    redirect_if_not_logged_in
    connection = Connection.find_by(id: params[:id])
    render connection_json(connection)
  end

  def create
    redirect_if_not_logged_in

    connection = Connection.new user: current_user, relationship: connection_params[:relationship]
    relation = User.create relation_params
    connection.relation = relation
    connection.save

    if connection.persisted?
      relation.invitation from: current_user if !relation[:email].empty?
      puts '***'
      puts relation.status
      puts '***'
      render connection_json(connection)
    else
      render invalid_connection(connection.errors, connection.user.errors)
    end
  end

  private


  def connection_params
    params.permit :relationship
  end

  def relation_params
    params.permit :name, :email, :avatar
  end


end
