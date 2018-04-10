import React from 'react';
import PropTypes from 'prop-types';
import s from './header.css';

const Header = props => (
  <div className={s.header}>
    {
      props.enableBack && <div className={s.btnWrapper}><button onClick={ () => (window.history.back()) }>Back</button></div>
    }
    <h1 className={s.title}>{props.title}</h1>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  enableBack: PropTypes.bool
};

export default Header;
