import React from 'react';
import s from './header.css';

const Header = props => (
  <div className={s.header}>
    {props.title}
  </div>
);

export default Header;
