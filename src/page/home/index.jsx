import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  Grid,
  Typography,
  withStyles,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import songApi from '../../api/song';
import GlobalStore from '../../store'
import SongCard from '../../components/cards/song';
import { debounce } from '../../utils/common';
import { ADD_SONG_TO_PLAYLIST } from '../../utils/constant'
import styles from './styles'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.pageLimit = 100
    this.state = {
      enableAdd: false,
      loading: true,
      searchText: '',
      allSongs: [],
      filteredSongs: [],
      page: 1,
      paginatedSongs: [],
      selectedSongs: [],
      selectedPlaylist: {}
    }

    this.handleSearch = debounce(this.handleSearch, 500)
  }

  componentDidMount() {
    const { location: { state }, history } = this.props
    if (state && state.enableSelection) {
      const selectedPlaylist = this.context.state.playlist.playlist
      const selectedSongs = {}
      if(selectedPlaylist.songs && selectedPlaylist.songs.length) {
        selectedPlaylist.songs.forEach(song => {
          selectedSongs[song.id] = song
        })
      }
      this.setState({
        enableAdd: true,
        selectedPlaylist,
        selectedSongs
      }, () => history.replace('/', null))
    }
    this.getSongs()
  }

  getSongs = async () => {
    try {
      const songs = await songApi.getAllSongs()
      this.setState({
        loading: false,
        allSongs: songs,
        filteredSongs: songs,
        paginatedSongs: songs.slice(0, this.pageLimit)
      })
    } catch (e) {
      this.setState({
        loading: false
      })
      this.context.dispatch({
        type: 'ERROR_SNACKBAR',
        payload: {
          message: e.message
        }
      })
    }
  }

  handlePagination = (page) => {
    const { filteredSongs, paginatedSongs } = this.state
    this.setState((prevState) => ({
      page,
      paginatedSongs: [
        ...paginatedSongs,
        ...filteredSongs.slice(prevState.page * this.pageLimit, page * this.pageLimit)
      ]
    }))
  }

  handleSelect = (checked, song) => {
    const { selectedSongs } = this.state
    let newSelected = { ...selectedSongs }
    if (checked) {
      newSelected[song.id] = song
    } else {
      delete newSelected[song.id]
    }
    this.setState({
      selectedSongs: newSelected
    })
  }

  handleSearch = (value) => {
    const { allSongs } = this.state
    const filteredSongs = allSongs.filter(song => song.title.includes(value))
    this.setState({
      filteredSongs,
      page: 1,
      paginatedSongs: filteredSongs.slice(0, this.pageLimit)
    })
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchText: value
    }, () => this.handleSearch(value.trim()))
  }

  handleFavourite = (checked, song) => {
    this.context.dispatch({
      type: checked ? "ADD_SONG_TO_FAVOURITE" : "REMOVE_SONG_TO_FAVOURITE",
      payload: song.id
    })
  }

  addToList = () => {
    const { selectedSongs, selectedPlaylist } = this.state
    const { history } = this.props
    this.context.dispatch({
      type: 'ADD_SONGS',
      payload: Object.values(selectedSongs)
    })
    this.context.dispatch({
      type: 'SUCCESS_SNACKBAR',
      payload: {
        message: ADD_SONG_TO_PLAYLIST
      }
    })
    history.push(`/playlist/${selectedPlaylist.id}`)
  }

  renderSong = (song) => {
    const { enableAdd, selectedSongs } = this.state
    const { favourites } = this.context.state.song
    return (
      <SongCard
        key={song.id}
        song={song}
        showFavourite
        handleSelect={this.handleSelect}
        handleFavourite={(checked) => this.handleFavourite(checked, song)}
        showCheckbox={enableAdd}
        isFavourite={favourites.includes(song.id + '')}
        checked={enableAdd && !!selectedSongs[song.id]}
      />
    )
  }

  renderSearch = () => {
    const { searchText } = this.state
    return (
      <TextField
        fullWidth
        id="search"
        label="Search"
        variant="outlined"
        placeholder="Search songs"
        onChange={this.handleInputChange}
        value={searchText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    )
  }

  render() {
    const { classes } = this.props
    const {
      paginatedSongs,
      enableAdd,
      selectedSongs,
      page,
      loading,
      searchText,
      selectedPlaylist,
      filteredSongs
    } = this.state
    return (
      <main
        ref={(ref) => this.scrollParentRef = ref}
        className={classes.container}
      >
        {enableAdd ?
          <Grid container item justify="space-between" alignItems="center" className={classes.addToList}>
            <Typography variant="h5" className={classes.title}>
              Add to Playlist {selectedPlaylist.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={!Object.values(selectedSongs).length}
              onClick={this.addToList}
            >
              Add
            </Button>
          </Grid>
          : ''}
        <Grid container className={classes.searchComponent}>
          {this.renderSearch()}
        </Grid>
        {searchText ? (
          <Grid container>
            <Typography variant="h6" className={classes.searchResult}>
              Search results for <strong>{searchText}</strong>
            </Typography>
          </Grid>
          )
          : ''}
        {!(paginatedSongs && paginatedSongs.length) && !loading ? (
          <Typography>
            No results found
          </Typography>
        ) : ''}
        <InfiniteScroll
          pageStart={page}
          loadMore={this.handlePagination}
          loader={<div className="loader" key={0}>Loading ...</div>}
          hasMore={paginatedSongs.length < filteredSongs.length}
          threshold={100}
          useWindow={false}
          getScrollParent={() => this.scrollParentRef}
        >
          {paginatedSongs.map(song => this.renderSong(song))}
        </InfiniteScroll>
      </main>
    )
  }
}

Home.contextType = GlobalStore

export default withStyles(styles)(Home)