import React, {Component} from 'react';
import Header from '../../components/header/header';
import Search from '../../components/search/search';
import SpotifyManager from '../../services/spotify-manager';

import style from './home.css';
import Grid from '../../components/grid/grid';
import GridItemArtist from '../../components/grid/grid-item-artist/grid-item-artist';

export default class Home extends Component {

  constructor(props) {
    super(props);
    // props.history.push('/login');
    this.state = {
      artists: []
    };
  }

  handleGridItemClick (item) {
    console.log(item);
    this.props.history.push('/artist/' + item.id);
  }

  handleSearchClick (value) {
    console.log('search', value);
    // const context = this;
    SpotifyManager.searchArtists(value).then(data => {
      console.log(data.artists.items);
      this.setState(prevState => {
        return {...prevState, artists: data.artists.items};
      });
    },
    err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className={style.container}>
        <Header title='Spotify test'/>
        <Search
          onSearchClick={(value) => (this.handleSearchClick(value))}
          placeholder='Digite o nome do artista'
        />
        <Grid>
          {
            this.state.artists && this.state.artists.map(item => {
              return <GridItemArtist cssClasses={style.gridItem} onItemClick={ (item) => this.handleGridItemClick(item) } key={item.id} item={item} />;
            })
          }
        </Grid>
      </div>
    );
  }
}
