import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import moment from 'moment';

import style from './grid-item-album.css';
// import noImage from './no-image.png';

class GridItemAlbum extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const item = this.props.item;
    console.log(item.genres);
    let imgSrc = '';
    if (item.images.length > 0) {
      imgSrc = item.images[0].url;
    }
    let divCollapseStyle = {};
    if (!item.expanded) {
      divCollapseStyle = {display: 'none'};
    }
    const fDate = moment(item.release_date).format('MMM YYYY');

    return <div>
      <div className={style.container} onClick={() => (this.props.onItemClick(item))}>
        <img src={imgSrc}/>
        <div>
          <p className={style.name}>{item.name}</p>
          <p className={style.releaseDate}>{fDate}</p>
        </div>
        <div style={divCollapseStyle} className={style.collapseDiv}>
          <p className={style.genre}>No gender</p>
          <div className={style.starsWrapper}>
            <div className={style.stars}>
              <Rating
                emptySymbol="far fa-star fa-2x"
                fullSymbol="fa fa-star fa-2x"
                start={0}
                stop={5}
                initialRating={item.popularity}
                fractions={2}
                readonly={true}
              />
            </div>
          </div>
          <div className={style.trackList}>
            <p className={style.listTitle}>Disc tracks</p>
            <ol>
              {
                item.tracks && item.tracks.items.map(track => (
                  <li key={track.id}>{track.name}</li>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    </div>;
  }
}

GridItemAlbum.propTypes = {
  onItemClick: PropTypes.func.isRequired
};

export default GridItemAlbum;
