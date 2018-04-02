import React from 'react';
import PropTypes from 'prop-types';

import style from './grid-item.css';
// import noImage from './no-image.png';

const GridItem = props => {
  console.log(props);
  const item = props.item;
  let imgSrc = '';
  if (item.images.length > 0) {
    imgSrc = item.images[0].url;
  }
  return <div className={style.container} onClick={ () => (props.onItemClick(item)) }>
    <img src={imgSrc}/>
    <p className={style.name}>{item.name}</p>
  </div>;
};

GridItem.propTypes = {
  onItemClick: PropTypes.func.isRequired
};

export default GridItem;
