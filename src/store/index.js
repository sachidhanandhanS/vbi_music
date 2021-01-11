import React from 'react';
import { initialPlaylistState } from './reducers/playlist'
import { initialSnackbarState } from './reducers/snackbar'
import { initialSongState } from './reducers/song'

export const initialState = {
  playlist: initialPlaylistState,
  snackbar: initialSnackbarState,
  song: initialSongState
}

const GlobalStore = React.createContext()

export default GlobalStore