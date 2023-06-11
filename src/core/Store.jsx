import React, {useEffect, useReducer} from 'react';
import CtxStore from '../shared/contexts/store';
import { reducer } from '../shared/store/reducer';
import {getVideos, setVideos, getAlbums, setAlbums} from '../shared/store/actions';
import API from './services/API';

const initialState = {
  videos: [],
  albums: [],
  selected: [],
  loadingVideo: false,
  loadingAlbums: false,
};

const StoreContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(getVideos());
    dispatch(getAlbums());

    API.get('/api/videos').then((values) => {
      dispatch(setVideos(values?.length ? values.map((item) => {
        const url = item.url.split('/');

        return {
          id: {
            videoId: url[url.length - 1],
          },
          snippet: {
            ...item,
          },
        };
      }) : [] ));
    });

    API.get('/api/albums').then((values) => {
      console.log('values => ', values);
      dispatch(setAlbums(values));
    });
  }, []);

  return (
    <CtxStore.Provider value={{ state, dispatch }}>
      {children}
    </CtxStore.Provider>
  );
};

export default StoreContext;
