import React from 'react';
import cls from "./search.module.scss";

export const Search = (props) => {
  const {value, onChange, onSubmit, ...otherProps} = props;

  return (
    <div className={cls.container}>
      <form className={cls.formSearch} onSubmit={onSubmit}>
        <label className={cls.label}>
          <input className={cls.search} type="text" onChange={onChange} value={value} {...otherProps} />
        </label>
        <button className={cls.btnSearch} type="submit">Search</button>
      </form>
    </div>

  );
};

