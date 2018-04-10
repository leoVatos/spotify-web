import React, {Component} from 'react';

import SpotifyManager from '../../services/spotify-manager';

const REDIRECT_URL = 'http://localhost:3000/login';

import Header from '../../components/header/header';

import style from './login.css';

export default class Login extends Component {

  constructor(props) {
    super(props);

    const token = this.getHashValue(window.location.hash, 'access_token');
    if (token) {
      console.log(token);
      SpotifyManager.setAccessToken(token);
      props.history.push('/');
    }
  }

  handleLoginSpotify () {
    SpotifyManager.requestAccessToken(REDIRECT_URL);
  }

  geParFromUrl(url, name) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regexS = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  }

  getHashValue(hash, key) {
    var matches = hash.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
  }

  render() {
    return (
      <div className={style.container}>
        <Header title='Spotify Clone'></Header>
        <button className={style.loginButton} onClick={() => { this.handleLoginSpotify(); }}>Login with Spotify</button>
      </div>
    );
  }
}
