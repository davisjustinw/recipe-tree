import React from 'react'
import { withRouter } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HistoryIcon from '@material-ui/icons/History'
import SearchBar from './SearchBar'
import Hidden from '@material-ui/core/Hidden'


const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  }
}))

const NavBar = ({ handleDrawerToggle, location }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
      {
        location.pathname !== '/login' && location.pathname !== '/signup' ?
        (<>
          <Hidden lgUp implementation="css">
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            Cook Tree
          </Typography>
          <SearchBar />
          <HistoryIcon />
          </>
        ) : null
      }
      </Toolbar>
    </AppBar>

  )
}

export default withRouter(NavBar)
