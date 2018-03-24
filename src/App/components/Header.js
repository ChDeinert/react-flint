import React from 'react';

import logo from 'Public/logo.svg';

import headerStyles from './Header.css';

const Header = () => (
  <header className={headerStyles.wrapper}>
    <img src={logo} className={headerStyles.logo} alt="logo" />
    <span>react-tinder</span>
  </header>
);

export default Header;
