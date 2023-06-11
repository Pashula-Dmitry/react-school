import {
  ADD_ALBUM,
  ADD_SELECT,
  ADD_VIDEOS,
  CLEAR_SELECT,
  GET_ALBUMS,
  GET_VIDEOS, REMOVE_ALBUM,
  REMOVE_SELECT,
  REMOVE_VIDEO,
  SET_ALBUMS,
  SET_VIDEOS
} from './constants';

export const getVideos = () => ({ type: GET_VIDEOS });
export const setVideos = (videos) => ({ type: SET_VIDEOS, payload: videos });

export const getAlbums = () => ({ type: GET_ALBUMS });
export const setAlbums = (albums) => ({ type: SET_ALBUMS, payload: albums });

export const addVideos = (videos) => ({ type: ADD_VIDEOS, payload: videos });
export const addAlbum = (album) => ({ type: ADD_ALBUM, payload: album });

export const removeVideos = (id) => ({ type: REMOVE_VIDEO, payload: id });
export const removeAlbum = (id) => ({ type: REMOVE_ALBUM, payload: id });

export const addSelect = (id) => ({ type: ADD_SELECT, payload: id });
export const removeSelect = (id) => ({ type: REMOVE_SELECT, payload: id });
export const clearSelects = () => ({ type: CLEAR_SELECT });
