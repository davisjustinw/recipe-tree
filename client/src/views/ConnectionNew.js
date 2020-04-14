import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { changeHandler } from '../helpers/form'
import { postConnection, resetSuccess } from '../stores/connection/connectionActions'

import Button from '@material-ui/core/Button'
import AvatarUpload from '../components/AvatarUpload'
import { Redirect } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

class ConnectionNew extends Component {
  constructor() {
    super()
    this.state = {
      submitSuccess: false,
      name: '',
      email: '',
      relationship: '',
      file: {
        name: '',
        url: null
      },
      avatar: '',
    }
  }

  handleChange = changeHandler.bind(this);

  handleFileChange = ({ target }) => {
    const file = target.files[0]
    this.setState({
      avatar: file,
      file: {
        name: target.value.split( '\\' ).pop(),
        url: URL.createObjectURL(file)
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { avatar, name, relationship, email } = this.state
    const data = new FormData()

    data.append('avatar', avatar)
    data.append('name', name)
    data.append('relationship', relationship)
    data.append('email', email)
    this.props.postConnection(data);
  }

  render() {
    const { handleChange, handleFileChange, handleSubmit } = this
    const { classes, errors, userId, submitSuccess, resetSuccess } = this.props
    const { file, name, relationship, email } = this.state

    if (submitSuccess === true) {
      resetSuccess()
      return <Redirect to={`/users/${userId}/connections`} />
    }
    return (
        <>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add Connection
            </Typography>

            <form noValidate className={classes.form} onSubmit={handleSubmit}>
              <AvatarUpload id="avatar"
                handleFileChange={handleFileChange}
                name="avatar"
                file={{ name: file.name, url: file.url }}
              />
              <TextField id="name"
                value={name}
                onChange={handleChange}
                error={!!errors.user.name}
                helperText={errors.user.name}
                variant="filled"
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                autoFocus
                required
              />

              <TextField id="relationship"
                value={relationship}
                onChange={handleChange}
                error={!!errors.connection.relationship}
                helperText={errors.connection.relationship}
                variant="filled"
                margin="normal"
                fullWidth
                label="Relationship"
                name="relationship"
                required
              />

              <TextField id="email"
                value={email}
                onChange={handleChange}
                error={!!errors.user.email}
                helperText={errors.user.email}
                variant="filled"
                margin="normal"
                fullWidth
                label="Email Invitation"
                name="email"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Connection
              </Button>
            </form>
          </div>
        </>
      )
  }

}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    marginTop: theme.spacing(3),
  },
})

const mapStateToProps = ({ error, user, connection }) => ({
  errors: error.validation_errors,
  userId: user.id,
  submitSuccess: connection.submitSuccess
})

const mapDispatchToProps = dispatch => ({
    postConnection: formData => dispatch(postConnection(formData)),
    resetSuccess: () => dispatch(resetSuccess())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ConnectionNew))
