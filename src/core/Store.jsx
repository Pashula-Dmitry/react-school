import React, {useEffect, useReducer} from 'react';
import CtxStore from '../shared/contexts/store';
import { reducer } from '../shared/store/reducer';
import {getVideos, setVideos} from '../shared/store/actions';
import API from './services/API';

const initialState = {
  videos: [],
  selected: [],
  loading: false,
};

const StoreContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(getVideos());

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
  }, []);

  return (
    <CtxStore.Provider value={{ state, dispatch }}>
      {children}
    </CtxStore.Provider>
  );
};

export default StoreContext;
