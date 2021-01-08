import React from 'react'
import {
  Container,
  withStyles,
  Typography,
  Grid,
  Button
} from '@material-ui/core'
import GlobalStore from '../../store'
import SongCard from '../../components/cards/song'
import { REMOVE_SONG_FROM_PLAYLIST } from '../../utils/constant'

const styles = ({
  container: {
    paddingTop: '40px'
  },
  title: {
    marginBottom: '30px'
  },
  browseBtn: {
    marginTop: '20px'
  }
})

class EditPlaylist extends React.Component {
  componentDidMount() {
    this.getPlaylist()
  }

  getPlaylist = () => {
    const { match: { params } } = this.props
    this.context.dispatch({
      type: 'GET_PLAYLIST',
      payload: params.id
    })
  }

  handleRoute = () => {
    const { history } = this.props
    history.push({
      pathname: '/',
      state: {
        enableSelection: true
      }
    })
  }

  handleDelete = (song) => {
    this.context.dispatch({
      type: 'REMOVE_SONG',
      payload: song.id
    })
    this.context.dispatch({
      type: 'SUCCESS_SNACKBAR',
      payload: {
        message: REMOVE_SONG_FROM_PLAYLIST
      }
    })
    this.getPlaylist()
  }

  renderNoData = () => {
    const { classes } = this.props
    return(
      <Grid container justify="center" alignItems="center" direction="column">
        <Typography variant="h6">
          It's pretty quiet in here.
        </Typography>
        <small>Let's find some tunes for your playlist!</small>
        <Button
          onClick={this.handleRoute}
          color="primary"
          className={classes.browseBtn}
          variant="contained"
        >
          Browse songs
        </Button>
      </Grid>
    )
  }

  renderSongs = (playlist) => {
    return (
      playlist.songs.map(song => (
        <SongCard song={song} handleClose={() => this.handleDelete(song)}/>
      ))
    )
  }

  render() {
    const { classes } = this.props
    const playlist = this.context.state.playlist.playlist || {}
    const hasSongs = playlist.songs && playlist.songs.length 
    return(
      <Container className={classes.container}>
        <Grid container justify="space-between" alignItems="center" className={classes.title}>
          <Typography variant="h5">
            {playlist.name}
          </Typography>
          {hasSongs ? <Button
            variant="outlined"
            color="primary"
            onClick={this.handleRoute}
          >
            Add Song
          </Button> : ''}
        </Grid>
        <Grid container className={classes.containerBody}>
          {!hasSongs
            ? this.renderNoData()
            : this.renderSongs(playlist)
          }
        </Grid>
      </Container>
    )
  }
}

EditPlaylist.contextType = GlobalStore

export default withStyles(styles)(EditPlaylist);
