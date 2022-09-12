import React from 'react';
import classNames from 'classnames';
import cls from './video.module.scss';


const Video = (props) => {
  const { src, width, height, className,  ...attrs } = props;

  const classes = classNames(
    cls.frame,
    className,
  );


  return (
    <iframe
      className={classes}
      src={src}
      height={height}
      width={width}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      {...attrs}
    >
    </iframe>
  );
};

export default Video;
