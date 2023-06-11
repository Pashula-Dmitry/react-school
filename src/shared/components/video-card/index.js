import React, { useMemo } from 'react';
import classNames from 'classnames';
import { ellipsString } from '../../helpers/ellipsString';
import mountains from '../../../assets/images/mountain.jpg';
import {ReactComponent as DeleteIcon} from '../../../assets/icons/cancel.svg';
import { Link } from 'react-router-dom';
import cls from './video-card.module.scss';

const VideoCard = (props) => {
  const {direction = 'column', onAction, selected = false, link, item, onDelete} = props;

  const Wrapper = useMemo(() => link ?  Link : 'div', [direction]);
  const classes = classNames(
    cls.link,
    { [cls.rowDirection]: direction === 'row' },
    { [cls.selected]: selected },
  );

  const renderImg = () => {
    if (item?.imgURL) {
      return item?.imgURL.url;
    }

    return null;
  };

  return (
    <Wrapper
      to={`/watch/${item.videoId}`}
      className={classes}
      onClick={onAction !== undefined ? (event) => onAction(event, item.videoId) : null }>
      <div className={cls.card} direction={direction}>
        <div className={cls.image}>
          {
            onDelete && <DeleteIcon onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onDelete(item.videoId);
            }} className={cls.iconDelete}/>
          }
          <img src={renderImg()} alt="" />
        </div>
        <div className={cls.text}>
          <h3 className={cls.title}>{item.title}</h3>
          <p className={cls.description}>{ellipsString(item.description, direction === 'row' ? 20 : 60)}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoCard;
