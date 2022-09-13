import React, { useMemo } from 'react';
import classNames from 'classnames';
import { ellipsString } from '../../helpers/ellipsString';
import mountains from '../../../assets/images/mountain.jpg';
import { Link } from 'react-router-dom';
import cls from './video-card.module.scss';

const VideoCard = (props) => {
  const {direction = 'column', onAction, selected = false, link, item} = props;
  const {id, snippet} = item;

  const Wrapper = useMemo(() => link ?  Link : 'div', [direction]);
  const classes = classNames(
    cls.link,
    { [cls.rowDirection]: direction === 'row' },
    { [cls.selected]: selected },
  );

  const renderImg = () => {
    if (!snippet.thumbnails) {
      return mountains;
    }
    if (direction === 'row') {
      return snippet.thumbnails?.default.url;
    }
    if (direction === 'column') {
      return snippet.thumbnails?.medium?.url;
    }
  };

  return (
    <Wrapper
      to={`/watch/${id.videoId}`}
      className={classes}
      onClick={onAction !== undefined ? (event) => onAction(event, id.videoId) : null }>
      <div className={cls.card} direction={direction}>
        <div className={cls.image}>
          <img src={renderImg()} alt="" />
        </div>
        <div className={cls.text}>
          <h3 className={cls.title}>{ellipsString(snippet.title, direction === 'row' ? 15 : 40)}</h3>
          <p className={cls.description}>{ellipsString(snippet.description, direction === 'row' ? 20 : 60)}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoCard;
