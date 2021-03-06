module ErrorMessage
  def invalid_input(user_errors)
    {
      json: {
        validation_errors: {
          user: user_errors
        }
      },
      status: :bad_request
    }
  end

  def invalid_connection(person_errors, connection_errors)
    {
      json: {
        validation_errors: {
          connection: connection_errors,
          person:  person_errors
        }
      },
      status: :bad_request
    }
  end

  def invalid_credentials
    {
      json: {
        error: {
          status: '400',
          message: "Invalid credentials"
        }
      },
      status: :bad_request
    }
  end

  def login_required
    {
      json: {
        error: {
          status: '401',
          message: "Login required"
        }
      },
      status: :unauthorized
    }
  end

  def not_authorized
    {
      json: {
        error: {
          status: '401',
          message: "You don't have permission for this resource"
        }
      },
      status: :unauthorized
    }
  end


end
