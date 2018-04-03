//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import Home from './pages/home/home';
import Login from './pages/login/login';
import ArtistDetail from './pages/artist-detail/artist-detail';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/artist/:id' component={ArtistDetail}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('app-container'));

