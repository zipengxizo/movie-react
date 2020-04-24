import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import Cinema from './views/cinema';
import Movie from './views/movie';
import Mine from './views/mine';

export default function App() {
    return (
      <Router>
        <Switch>
          <Route path="/movie">
            <Movie />
          </Route>
          <Route path="/cinema">
            <Cinema />
          </Route>
          <Route path="/mine">
            <Mine />
          </Route>
          <Route path="/">
            <Movie />
          </Route>
        </Switch>
      </Router>
    )
}
