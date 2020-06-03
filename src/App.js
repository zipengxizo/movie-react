import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { CityContext, city } from "./context/city";
import Interceptors from "./util/interceptors";

import ErrorBoundary from "./util/boundaries/errorBoundary";
import { Provider } from "mobx-react";
import stores from './store'
export default class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Provider {...stores}>
            <Router basename="movie">
                <Interceptors />
            </Router>
        </Provider>
      </ErrorBoundary>
    );
  }
}
