import React, {Component} from 'react';
import Header from '../components/header/header';
import Search from '../components/search/search';
import SpotifyManager from '../services/spotify-manager';

export default class Home extends Component {

  constructor(props) {
    super(props);
    // props.history.push('/login');
  }

  handleSearchClick (value) {
    console.log('search', value);
    SpotifyManager.searchArtists(value);
  }

  render() {
    return (
      <div>
        <Header title='Spotify test'/>
        <Search
          onSearchClick={this.handleSearchClick}
          placeholder='Digite o nome do artista'
        />
      </div>
    );
  }
}
