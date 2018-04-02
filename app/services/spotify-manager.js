import axios from 'axios';

const CLIENT_ID = 'd610077e02d64665beb608422e1f8aef';
const URL_SPOTIFY_API = 'https://api.spotify.com/v1/search';

class SpotifyManager {

  constructor () {
    this.accessToken = 'BQAvlW2EaUsIHYATQAItQKCsGXWeRC9VCrYU6O6Z-0dbsFpZQJyZQmkU87VG3YsH_GNZPDpeO6rAW6UTVJ2EKR7GeBHG6mcqLPtMJDpwpA63ShN5xQmZWixYaUOHlUdxfrbI6ESe0nqiAzfaUdzXm7NiQa9JUA8';
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

}

export default new SpotifyManager();
