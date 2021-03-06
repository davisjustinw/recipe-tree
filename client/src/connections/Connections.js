import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getConnections, clearConnection } from '../stores/connection/connectionActions'
import { withStyles } from '@material-ui/core/styles'

import { Link as RouterLink } from 'react-router-dom'
import ConnectionCard from './ConnectionCard'
import Loading from '../shared/Loading'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'

class Connections extends Component {
  componentDidMount() {
    this.props.getConnections(this.props.userId)
    this.props.clearConnection()
  }

  render(){
    const { connections, classes, userId } = this.props
    if(!connections){
      return <Loading/>
    } else {
      return (
      <>
        <Typography variant='h4' gutterBottom>
          Connections
        </Typography>
        {
          connections.map(connection => {
            return <ConnectionCard key={connection.id} connection={connection}/>
          })
        }
        <Fab
          component={RouterLink}
          to={`/users/${userId}/connections/new`}
          color="secondary"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </>
    )
    }
  }
}

const mapStateToProps = ({ connection, user }) => {
  return {
    connections: connection.list,
    userId: user.id
  }
}

const mapDispatchToProps = (dispatch) => ({
  getConnections: userId => dispatch(getConnections(userId)),
  clearConnection: () => dispatch(clearConnection())
})

const useStyles = theme => ({
  fab: {
    margin: theme.spacing(0),
    top: 'auto',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    left: 'auto',
    position: 'fixed',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Connections))
