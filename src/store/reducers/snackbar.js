export const initialSnackbarState = {
  open: false,
  type: '',
  autoHideDuration: 3000,
  message: ''
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'SUCCESS_SNACKBAR':
      return {
        ...state,
        open: true,
        type: 'success',
        message: action.payload.message
      };
    case 'ERROR_SNACKBAR':
      return {
        ...state,
        open: true,
        type: 'error',
        message: action.payload.message
      }
    case 'RESET_SNACKBAR':
      return initialSnackbarState
    default:
      return state;
  }
}
