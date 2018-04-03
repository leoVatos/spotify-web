import axios from 'axios';
import _ from 'lodash';

const CLIENT_ID = 'd610077e02d64665beb608422e1f8aef';
const URL_SPOTIFY_API = 'https://api.spotify.com/v1/search';
const URL_SPOTIFY_ALBUMS = 'https://api.spotify.com/v1/artists/{id}/albums';
const URL_SPOTIFY_GET_ALBUM = 'https://api.spotify.com/v1/albums/';

class SpotifyManager {

  constructor () {
    this.accessToken = 'BQBtu3y5gChH_eM0ph8yesXFPpjDhfCEqVTJ7xfs3O09-W4y2kfYbWqofFKO4lcG26NH8xIqsHohlSz4nVH8e7VzJl3THO_srKa0PboX9EhQc58ZKfRVufEdGk4ELwnRIAWCqkgmhVJOswRxkDy1ir8-Kv5i3js';
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
    return new Promise((resolve, reject) => {
      const params = `?q=${name}&type=artist&limit=50`;
      axios.get(URL_SPOTIFY_API + params, {
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
