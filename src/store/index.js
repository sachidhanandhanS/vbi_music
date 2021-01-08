import React from 'react';
import { initialPlaylistState } from './reducers/playlist'
import { initialSnackbarState } from './reducers/snackbar'

export const initialState = {
  playlist: initialPlaylistState,
  snackbar: initialSnackbarState
}

const GlobalStore = React.createContext()

export default GlobalStore