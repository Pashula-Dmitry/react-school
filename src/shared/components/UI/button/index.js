import React from 'react';
import classNames from 'classnames';
import cls from './button.module.scss';

const Button = (props) => {
  const { children, className, variant = 'contained', onClick, disableRipple = false, disabled = false, ...attrs } = props;

  const classes = classNames(
    cls.button,
    { [cls.btnVariantText]: variant === 'text' },
    { [cls.btnVariantOutlined]: variant === 'outlined' },
    { [cls.btnVariantContained]: variant === 'contained' },
    className,
    { [cls.disableRipple]: disableRipple },
    { [cls.btnDisabled]: disabled },
  );

  return (
    <button
      disabled={disabled}
      className={classes}
      onClick={onClick}
      {...attrs}
    >
      {children}
    </button>
  );
};

export default Button;
