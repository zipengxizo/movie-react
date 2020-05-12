import React from "react";

import {Route, withRouter, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";

import axios from "axios";

import { PrivateRoute } from "../../auth";
import Admin from "../../component/admin";
import Login from "../../component/login";
import TabBar from "../../component/tabbar";
// import Cinema from "../../views/cinema";
// import Movie from '../../views/movie'
const Cinema = React.lazy(() => import("../../views/cinema"));
const Movie = React.lazy(() => import("../../views/movie"));
const Mine = React.lazy(() => import("../../views/mine"));
const Detail = React.lazy(() => import("../../component/nowPlaying/detail"));

class Interceptors extends React.Component {
  constructor(props) {
    super(props);

    this.cancel = null;

    let cancelToken = axios.CancelToken;
    axios.interceptors.request.use(
      (config) => {
        config.cancelToken = new cancelToken((c) => {
          this.cancel = c;
        });
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  componentDidMount() {
    this.props.history.listen((route) => {
      if (this.cancel) {
        this.cancel("取消请求！！");
      }
    });
  }
  render() {
    return (
      <>
        <CacheSwitch>
          <CacheRoute path="/movie" component={Movie} className="movie-box">
            {/* <Movie /> */}
          </CacheRoute>
          <CacheRoute path="/cinema" component={Cinema}>
          </CacheRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/mine">
            <Mine />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <Route path="/detail/:movieId" component={Detail}></Route>
          <Route path="/">
            <Redirect to="/movie" />
          </Route>
        </CacheSwitch>
        <TabBar />
      </>
    );
  }
}

export default withRouter(Interceptors);
