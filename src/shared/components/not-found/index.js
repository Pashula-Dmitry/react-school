import React from 'react';
import classes from './notFound.module.scss';

export const NotFound = ({text}) => {
  return (
    <div className={classes.notFound}>
      {text}
    </div>
  );
};

