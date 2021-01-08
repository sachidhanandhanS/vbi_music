import { generateUUID, getFormatedDate } from '../../utils/common'

export const initialPlaylistState = {
  playlist: {},
  list: [{
    id: generateUUID(),
    name: 'Sample',
    createdAt: getFormatedDate(),
    songs: [] // array of song ids
  }],
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return {
        ...state,
        list: [
          {
            id: generateUUID(),
            name: action.payload,
            createdAt: getFormatedDate(),
            songs: []
          },
          ...state.list
        ],
      };
    case 'DELETE_PLAYLIST':
      return {
        ...state,
        list: state.list.filter(item => item.id + '' !== action.payload + '')
      }
    case 'GET_PLAYLIST':
      return {
        ...state,
        playlist: state.list.find(item => item.id + '' === action.payload + '')
      }
    case 'ADD_SONGS':
      return {
        ...state,
        list: state.list.map(item => {
          if(state.playlist.id === item.id) {
            return {
              ...item,
              songs: action.payload
            }
          }
          return item
        })
      }
    case 'REMOVE_SONG':
      return {
        ...state,
        list: state.list.map(item => {
          if(state.playlist.id === item.id) {
            return {
              ...item,
              songs: item.songs.filter(song => song.id !== action.payload)
            }
          }
          return item
        })
      }
    default:
      return state;
  }
}
