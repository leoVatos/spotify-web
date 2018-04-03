import React from 'react';
import PropTypes from 'prop-types';

import style from './grid-item-artist.css';
// import noImage from './no-image.png';

const GridItemArtist = props => {
  const item = props.item;
  let imgSrc = '';
  if (item.images.length > 0) {
    imgSrc = item.images[0].url;
  }
  return <div className={style.container + ' ' + props.cssClasses} onClick={ () => (props.onItemClick(item)) }>
    <img src={imgSrc}/>
    <p className={style.name}>{item.name}</p>
  </div>;
};

GridItemArtist.propTypes = {
  onItemClick: PropTypes.func.isRequired
};

export default GridItemArtist;
