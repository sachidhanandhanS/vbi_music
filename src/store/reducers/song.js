export const initialSongState = {
  favourites: []
};

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_SONG_TO_FAVOURITE":
      return {
        ...state,
        favourites: [
          ...state.favourites,
          `${action.payload}`
        ]
      };
    case "REMOVE_SONG_TO_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter(id => `${id}` !== `${action.payload}`)
      }
    default:
      return state;
  }
}
