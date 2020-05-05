import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRecipe } from '../stores/recipe/recipeActions'
import { withStyles } from '@material-ui/core/styles'
import { handleRecipeChange } from '../stores/recipe/recipeActions'

import Loading from '../shared/Loading'
import RecipeCard from './RecipeCard'
import InputBase from '@material-ui/core/InputBase'

class Recipe extends Component {

  componentDidMount(){
    console.log('recipe mounting')
    this.props.getRecipe(this.props.match.params.id)
  }

  handleRecipeChange = ({ target }) => {
    this.props.handleRecipeChange({ name: target.name, value: target.value })
  }

  render() {
    const { id, name, make, classes } = this.props

    if(!id){
      return <Loading/>
    } else {
      return (
        <>
          <div className={classes.paper}>
          <InputBase
            classes={{
              root: classes.root,
              input: classes.input
            }}
            type='text'
            name='name'
            value={name}
            onChange={this.handleRecipeChange}
            placeholder='Recipe Name...'
          />
          <RecipeCard recipeId={id} make={make}/>
          </div>
        </>
      )
    } // else
  } //render
} // class Connection

const mapDispatchToProps = dispatch => ({
  getRecipe: recipeId => dispatch(getRecipe(recipeId)),
  handleRecipeChange: change => dispatch(handleRecipeChange(change))
})

const mapStateToProps = ({ recipe, make }) => ({
  id: recipe.current.id,
  name: recipe.current.name,
  make: make.current
})

const useStyles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    alignSelf: 'flex-start'
  },
  input: {
    marginBottom: theme.spacing(0),
    padding: theme.spacing(0),
    color: theme.palette.text.primary,
    ...theme.typography.h5,
    '&::placeholder':{
      color: theme.palette.text.secondary,
      opacity: 1,
      ...theme.typography.h5
    }
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Recipe)))
