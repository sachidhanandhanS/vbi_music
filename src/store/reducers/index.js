import playlistReducer from './playlist'
import snackbarReducer from './snackbar'

const reducers = {
  playlist: playlistReducer,
  snackbar: snackbarReducer
}

const combineReducer = () => {
  return (state, action) => {
    const newState = {}
    for(let key in reducers) {
      newState[key] = reducers[key](state[key], action)
    }
    return newState
  }
}

export default combineReducer;
