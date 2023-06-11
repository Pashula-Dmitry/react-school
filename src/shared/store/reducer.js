import {
  ADD_SELECT,
  ADD_VIDEOS,
  CLEAR_SELECT,
  GET_VIDEOS,
  REMOVE_SELECT,
  SET_VIDEOS,
  SET_ALBUMS,
  GET_ALBUMS,
  ADD_ALBUM,
  REMOVE_ALBUM, REMOVE_VIDEO
} from './constants';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_VIDEOS: return {
      ...state,
      loadingVideo: true,
    };
    case SET_VIDEOS: return {
      ...state,
      loadingVideo: false,
      videos: action.payload,
    };
    case GET_ALBUMS: return {
      ...state,
      loadingAlbums: true,
    };
    case SET_ALBUMS: return {
      ...state,
      loadingAlbums: false,
      albums: action.payload,
    };
    case ADD_ALBUM: return {
      ...state,
      albums: [action.payload, ...state.albums],
    };
    case ADD_VIDEOS: return {
      ...state,
      videos: [...state.videos, ...action.payload],
    };
    case REMOVE_ALBUM: return {
      ...state,
      albums: state.albums.filter((album) => album.id !== action.payload),
    };
    case REMOVE_VIDEO: return {
      ...state,
      videos: state.videos.filter((video) => video.id !== action.payload),
    };
    case ADD_SELECT: return {
      ...state,
      selected: [...state.selected, action.payload],
    };
    case REMOVE_SELECT: return {
      ...state,
      selected: state.selected.filter((sel) => sel !== action.payload),
    };
    case CLEAR_SELECT: return {
      ...state,
      selected: [],
    };
    default: return state;
  }
};
