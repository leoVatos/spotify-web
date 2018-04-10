import axios from 'axios';
import _ from 'lodash';

const CLIENT_ID = 'd610077e02d64665beb608422e1f8aef';
const URL_SPOTIFY_API = 'https://api.spotify.com/v1';
const URL_SPOTIFY_API_SEARCH = URL_SPOTIFY_API + '/search';
const URL_SPOTIFY_ALBUMS = URL_SPOTIFY_API + '/artists/{id}/albums';
const URL_SPOTIFY_GET_ALBUM = URL_SPOTIFY_API + '/albums/';

class SpotifyManager {

  constructor () {
    this.accessToken = window.localStorage.getItem('token');
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
    window.localStorage.setItem('token', token);
  }

  searchArtists (name) {
    return new Promise((resolve, reject) => {
      let params = `?q=${name}&type=artist&limit=50`;
      axios.get(URL_SPOTIFY_API_SEARCH + params, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      }).then((response) => {
        console.log('response', response);
        console.log('data', response.data);
        resolve(response.data);
      },
      err => {
        console.log(err);
        reject(err);
      });
    });
  }

  getArtistAlbums (artistId) {
    return new Promise((resolve, reject) => {
      const params = `?limit=50`;
      const url = URL_SPOTIFY_ALBUMS.replace('{id}', artistId);
      axios.get(url + params, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      }).then((response) => {
        console.log('response', response);
        console.log('data', response.data);
        response.data.items = _.sortBy(response.data.items, ['release_date']).reverse();
        resolve(response.data);
      },
      err => {
        console.log(err);
        reject(err);
      });
    });
  }

  getAlbumById (albumId) {
    return new Promise((resolve, reject) => {
      const params = `?limit=50`;
      const url = URL_SPOTIFY_GET_ALBUM + albumId;
      axios.get(url + params, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      }).then((response) => {
        console.log('response', response);
        console.log('data', response.data);
        resolve(response.data);
      },
      err => {
        console.log(err);
        reject(err);
      });
    });
  }
}

export default new SpotifyManager();
