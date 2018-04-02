import axios from 'axios';

const CLIENT_ID = 'd610077e02d64665beb608422e1f8aef';
const URL_SPOTIFY_API = 'https://api.spotify.com/v1/search';

class SpotifyManager {

  constructor () {
    this.accessToken = 'BQBdIQKQ1naQtNSSiGMPtqGkjycLTyV7nw8DUyim5nEK6Z3As-NEekQosA0cgJDSNjUSWoIB6DjkW-iNrrtQP6xj7Mq3fPs6OgWdtMWfxWGb0IcTXo03ez2fzudMXE4ellO9eZl9jFSf9edJ4v_iV-9CAsiA9p0';
    this.lastTokenUpdate = null;
  }

  isAuthorized () {
    return this.accessToken === '';
  }

  requestAccessToken (redirectUrl) {
    const scopes = 'user-read-private user-read-email';
    window.open('https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirectUrl), '_parent');
  }

  setAccessToken (token) {
    this.accessToken = token;
    this.lastTokenUpdate = new Date();
  }

  searchArtists (name) {
    const params = `?q=${name}&type=artist&limit=50`;
    axios.get(URL_SPOTIFY_API + params, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    }).then((response) => {
      console.log('response', response);
      console.log('data', response.data);
    },
    err => {
      console.log(err);
    });
  }

}

export default new SpotifyManager();
