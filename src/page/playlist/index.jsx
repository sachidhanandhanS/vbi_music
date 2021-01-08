import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {
  Container,
  Grid,
  Typography,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  TextField,
  DialogTitle
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/CloseOutlined'
import GlobalStore from '../../store'
import {
  DELETE_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_SUCCESS
} from '../../utils/constant'

const styles = ({
  playlistContainer: {
    paddingTop: '30px',
    height: '100%'
  },
  title: {
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#2e384d'
  },
  containerBody: {
    borderRadius: '4px',
    border: 'solid 1px #d7dee8',
    backgroundColor: '#ffffff',
    marginTop: '56px',
    padding: '12px'
  },
  playlist: {
    height: '62px',
    padding: '12px',
    cursor: 'pointer',
    borderBottom: 'solid 1px #d7dee8',
    '&:last-child': {
      border: 'none'
    },
    '&:hover': {
      backgroundColor: 'rgba(245, 246, 250, 0.5)',
    }
  },
  addBtn: {
    fontWeight: 600
  }
})

class Playlist extends React.Component {
  state = {
    showDialog: false,
    name: ''
  }

  handleNameChange = ({ target: { value }}) => {
    this.setState({
      name: value
    })
  }

  handleClose = () => {
    this.setState({
      showDialog: false
    })
  }

  handleOpen = () => {
    this.setState({
      showDialog: true,
      name: ''
    })
  }

  handleSave = () => {
    const { name } = this.state
    this.context.dispatch({
      type: 'ADD_PLAYLIST',
      payload: name
    })
    this.context.dispatch({
      type: 'SUCCESS_SNACKBAR',
      payload: {
        message: ADD_PLAYLIST_SUCCESS
      }
    })
    this.setState({
      showDialog: false
    })
  }

  handleDelete = (e, id) => {
    e.stopPropagation()
    this.context.dispatch({
      type: 'DELETE_PLAYLIST',
      payload: id
    })
    this.context.dispatch({
      type: 'SUCCESS_SNACKBAR',
      payload: {
        message: DELETE_PLAYLIST_SUCCESS
      }
    })
  }

  handleRoute = (id) => {
    const { history } = this.props
    history.push(`/playlist/${id}`)
  }

  renderAddDialog = () => {
    const { showDialog, name } = this.state
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={showDialog}
        onClose={this.handleClose}
      >
        <DialogTitle>Create a New Playlist</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            autoFocus
            label="Your playlist name"
            type="name"
            onChange={this.handleNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={this.handleSave}
            color="primary"
            variant="contained"
            disabled={!name}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const { classes } = this.props
    const list = this.context.state.playlist.list
    return (
      <Container className={classes.playlistContainer}>
        <Grid container justify="space-between" alignItems="center">
          <Typography className={classes.title}>
            My Playlist
          </Typography>
          <Button
            className={classes.addBtn}
            color="primary"
            onClick={this.handleOpen}
            variant="outlined"
          >
            New Playlist
          </Button>
        </Grid>
        {list && list.length ? <div className={classes.containerBody}>
          {list.map(playlist => {
            return(
              <Grid
                key={playlist.id}
                container
                onClick={() => this.handleRoute(playlist.id)}
                className={classes.playlist}
                alignItems="center"
              >
                <Grid item xs={12} sm={5}>
                  {playlist.name}
                </Grid>
                <Grid item xs={6} sm={5}>
                  {playlist.createdAt}
                </Grid>
                <Grid container item xs={6} sm={1} justify="flex-end" >
                  <CloseIcon
                    color="secondary"
                    onClick={e => this.handleDelete(e, playlist.id)}
                  />
                </Grid>
              </Grid>
            )
          })}
        </div> : ''}
        {this.renderAddDialog()}
      </Container>
    )
  }
}

Playlist.contextType = GlobalStore

export default withStyles(styles)(Playlist)