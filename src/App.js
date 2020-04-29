import React, { Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import history from "./util/history";
import { CityContext, city } from "./context/city";

import { Loading } from "./component/loading";
import ErrorBoundary from "./util/boundaries/errorBoundary";

const Detail = React.lazy(() => import("./component/nowPlaying/detail"));
const Cinema = React.lazy(() => import("./views/cinema"));
const Movie = React.lazy(() => import("./views/movie"));
const Mine = React.lazy(() => import("./views/mine"));

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeCityId = (cityId, cityName) => {
      this.setState({
        cityId: cityId,
        cityName: cityName,
      });
    };
    this.state = {
      cityId: city.cityId,
      cityName: city.cityName,
      changeCityId: this.changeCityId,
    };
  }

  render() {
    return (
      <ErrorBoundary>
        <CityContext.Provider value={this.state}>
          <Router history={history}>
            <Suspense fallback={<Loading isLoading />}>
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
                <Route path="/detail/:movieId" component={Detail}></Route>
                <Route path="/">
                  <Movie />
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </CityContext.Provider>
      </ErrorBoundary>
    );
  }
}
