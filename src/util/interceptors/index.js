import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { PrivateRoute } from "../../auth";
import Admin from "../../component/admin";
import Login from "../../component/login";
import TabBar from "../../component/tabbar";
import { cancel } from "../../util/http";
import { observer, inject } from "mobx-react";
// import loadable from "../loadable/index";
/* const Cinema = loadable(() => import("../../views/cinema"));
const Movie = loadable(() => import("../../views/movie"));
const Mine = loadable(() => import("../../views/mine"));
const Detail = loadable(() => import("../../component/nowPlaying/detail")); */

const Cinema = React.lazy(() => import("../../views/cinema"));
const Movie = React.lazy(() => import("../../views/movie"));
const Mine = React.lazy(() => import("../../views/mine"));
const Detail = React.lazy(() => import("../../component/nowPlaying/detail"));

@inject("globalStore")
@observer
class Interceptors extends React.Component {
  constructor(props) {
    super(props);
    this.globalStore = this.props.globalStore;
  }

  componentDidMount() {
    this.props.history.listen((route) => {
      if (this.globalStore.isNetwork) {
        this.globalStore.isNetwork = false;
      }
      if (cancel && !/detail+/.test(this.props.history.location.pathname)) {
        cancel("取消请求！！");
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <CacheSwitch>
          <CacheRoute
            path="/movie"
            component={Movie}
            className="movie-box"
          ></CacheRoute>
          <CacheRoute
            path="/cinema"
            component={Cinema}
            className="movie-box"
          ></CacheRoute>
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
      </React.Fragment>
    );
  }
}

export default withRouter(Interceptors);
