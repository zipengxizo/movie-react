import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import history from "./util/history";
// import { CityContext, city } from "./context/city";
import Interceptors from "./util/interceptors";

import { Loading } from "./component/loading";
import ErrorBoundary from "./util/boundaries/errorBoundary";
import { Provider } from "mobx-react";
import stores from './store'
export default class App extends React.Component {
  /* constructor(props) {
    super(props);

    this.changeCityId = (cityId, cityName) => {
      this.setState({
        cityId: cityId,
        cityName: cityName,
      });
    };
    this.changeTabIndex = (tabIndex) => {
      if (this.state.tabIndex !== tabIndex) {
        this.setState({
          tabIndex: tabIndex,
        });
      }
    };
    this.state = {
      cityId: city.cityId,
      cityName: city.cityName,
      tabIndex: city.tabIndex,
      changeCityId: this.changeCityId,
      changeTabIndex: this.changeTabIndex,
    };
  } */
  render() {
    return (
      <ErrorBoundary>
        <Provider {...stores}>
          {/* <CityContext.Provider value={this.state}> */}
            <Router history={history} basename="movie">
              <Suspense fallback={<Loading isLoading />}>
                <Interceptors />
              </Suspense>
            </Router>
          {/* </CityContext.Provider> */}
        </Provider>
      </ErrorBoundary>
    );
  }
}
