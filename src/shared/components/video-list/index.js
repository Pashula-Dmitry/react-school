import React, { useCallback } from 'react';
import VideoCard from '../video-card';

import cls from './video-list.module.scss';
import classNames from 'classnames';
import { useStore } from '../../hooks/useStore';
import { addSelect, removeSelect } from '../../store/actions';

const VideoList = ({ directionList = 'row', videos, selectMode, link }) => {
  const { state: { selected }, dispatch } = useStore();

  const classes = classNames(
    cls.grid,
    directionList === 'row' ? cls.gridRow : cls.gridColumn,
  );

  const handleSelect = useCallback((event, id) => {

    if (!selected.includes(id)) {
      dispatch(addSelect(id));
    } else {
      dispatch(removeSelect(id));
    }

  }, [selected]);


  return (
    <div className={classes}>
      {
        videos && videos.map((item) => (
          <VideoCard
            link={link}
            direction={directionList === 'row' ? 'column': 'row'}
            onAction={handleSelect}
            item={item}
            selected={selectMode && selected.includes(item.id.videoId)}
          />
        ))
      }
    </div>
  );
};

export default VideoList;
