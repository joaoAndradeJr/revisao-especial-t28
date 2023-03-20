import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Forecast from './pages/Forecast';
import Home from './pages/Home';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/"component={ Home } />
        <Route path="/forecast/:city" component={ Forecast } />
      </Switch>
    );
  }
}
