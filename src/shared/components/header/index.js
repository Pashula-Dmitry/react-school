import React from 'react';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import cls from './header.module.scss';

const Header = () => {

  return (
    <header className={cls.header}>
      <div className={`${cls.container} ${cls.headerItems}`}>
        <Link to="/" className={cls.link}>
          <div className={cls.logo}>
            <div className={cls.logoImg}>
              <img src={logo} alt="" />
            </div>
            <h1 className={cls.logoText}>LANARS react school</h1>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
