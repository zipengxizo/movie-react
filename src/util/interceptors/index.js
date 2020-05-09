import React,{Suspense} from 'react'

import { Switch,Route,withRouter,Redirect } from 'react-router-dom'


import axios from "axios";

import { PrivateRoute } from "../../auth";
import Admin from "../../component/admin";
import Login from "../../component/login";

import { Loading } from "../../component/loading";
const Detail = React.lazy(() => import("../../component/nowPlaying/detail"));
const Cinema = React.lazy(() => import("../../views/cinema"));
const Movie = React.lazy(() => import("../../views/movie"));
const Mine = React.lazy(() => import("../../views/mine"));


class Interceptors extends React.Component {
  constructor(props) {
    super(props);

    this.cancel = null;
  }

  componentDidMount() {
    this.props.history.listen((route) => {
      if (this.cancel) {
        this.cancel("取消请求！！");
      }
    });
  }

  componentWillMount() {
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
  render() {
    return (
      <Switch>
        <Route path="/movie">
          <Movie />
        </Route>
        <Route path="/cinema">
          <Cinema />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/mine">
          <Mine />
        </PrivateRoute>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Suspense fallback={<Loading isLoading />}>
          <Route path="/detail/:movieId" component={Detail}></Route>
        </Suspense>
        <Route path="/">
          <Redirect to="/movie" />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Interceptors)
