import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { CityContext, city } from "./context/city";
import Interceptors from "./util/interceptors";

import { Loading } from "./component/loading";
import ErrorBoundary from "./util/boundaries/errorBoundary";
import { Provider } from "mobx-react";
import stores from './store'
export default class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Provider {...stores}>
            <Router basename="movie">
              <Suspense fallback={<Loading isLoading />}>
                <Interceptors />
              </Suspense>
            </Router>
        </Provider>
      </ErrorBoundary>
    );
  }
}
