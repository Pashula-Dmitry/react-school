import React, {useCallback} from 'react';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import cls from './header.module.scss';
import { Search } from "../search";
import {useSearch} from "../../hooks/useSearch";

const Header = () => {
  const { dispatch, search } = useSearch();

  const handleSearch = useCallback((event) => {

    dispatch(event.target.value);
  }, []);

  const onSubmit = useCallback(() => {

  }, []);

  return (
    <header className={cls.header}>
      <div className={`${cls.container} ${cls.headerItems}`}>
        <Link to="/" className={cls.link}>
          <div className={cls.logo}>
            <div className={cls.logoImg}>
              <img src={logo} alt="Logo" />
            </div>
            <h1 className={cls.logoText}>YouTube Clone</h1>
          </div>
        </Link>
        <Link to="/" className={cls.linkText}>Videos</Link>
        <Link to="/albums" className={cls.linkText}>Albums</Link>
        <Search
          placeholder="Find videos"
          value={search}
          onChange={handleSearch}
          onSubmit={onSubmit}
        />
      </div>
    </header>
  );
};

export default Header;
