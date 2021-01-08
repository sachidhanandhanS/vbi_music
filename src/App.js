import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './route'
import Header from './components/header';
import GlobalStore, { initialState } from './store'
import combineReducer from './store/reducers'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function App() {
  const [state, dispatch] = useReducer(combineReducer(), initialState)
  const snackbar = state.snackbar
  const handleClose = () => {
    dispatch({
      type: 'RESET_SNACKBAR'
    })
  }
  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Snackbar open={snackbar.open} autoHideDuration={snackbar.autoHideDuration} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={snackbar.type}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </BrowserRouter>
    </GlobalStore.Provider>
  );
}

export default App;
