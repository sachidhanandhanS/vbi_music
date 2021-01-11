import React from 'react'
import {
  withStyles,
  Typography,
  Grid,
  Button
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ShuffleIcon from '@material-ui/icons/Shuffle';
import GlobalStore from '../../store'
import SongCard from '../../components/cards/song'
import { REMOVE_SONG_FROM_PLAYLIST } from '../../utils/constant'
const styles = ({
  container: {
    padding: '60px',
    overflow: 'auto',
    height: 'calc(100% - 185px)'
  },
  title: {
    marginBottom: '30px',
    '& h5': {
      fontSize: '38px',
      fontWeight: 'bold',
      color: '#2e384d',
    }
  },
  browseBtn: {
    marginTop: '20px'
  },
  totalSongs: {
    paddingLeft: '10px',
    color: '#a9a9a9',
    fontSize: '13.33px',
    fontWeight: 'normal'
  },
  mr20: {
    marginRight: '20px'
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

  handleShuffle = () => {
    this.context.dispatch({
      type: 'SHUFFLE_SONGS'
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
        <SongCard
          song={song}
          key={song.id}
          handleClose={() => this.handleDelete(song)}
        />
      ))
    )
  }

  render() {
    const { classes } = this.props
    const playlist = this.context.state.playlist.playlist || {}
    const hasSongs = playlist.songs && playlist.songs.length 
    return(
      <main className={classes.container}>
        <Grid container justify="space-between" alignItems="center" className={classes.title}>
          <Typography variant="h5">
            {playlist.name}
            {playlist.songs && <small className={classes.totalSongs}>{playlist.songs.length} Song(s)</small>}
          </Typography>
          {hasSongs ? (
            <Grid container item xs={6} justify="flex-end">
              <Button
                variant="outlined"
                color="primary"
                className={classes.mr20}
                onClick={this.handleShuffle}
                startIcon={<ShuffleIcon color="primary" />}
              >
                Shuffle
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleRoute}
                startIcon={<AddIcon />}
              >
                Add Song
              </Button>
            </Grid>
            ) : ''}
        </Grid>
        <Grid container className={classes.containerBody}>
          {!hasSongs
            ? this.renderNoData()
            : this.renderSongs(playlist)
          }
        </Grid>
      </main>
    )
  }
}

EditPlaylist.contextType = GlobalStore

export default withStyles(styles)(EditPlaylist);
