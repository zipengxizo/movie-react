import React from "react";
import { Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import Header from "../../component/header";
import "./index.css";
import Menu from "../../component/menu";
/* import loadable from '../../util/loadable'
const Research = loadable(()=>import('../../component/research'));
const City = loadable(()=>import('../../component/city'));
const NowPlaying = loadable(()=>import('../../component/nowPlaying')); */

const Research = React.lazy(() => import("../../component/research"));
const City = React.lazy(() => import("../../component/city"));
const NowPlaying = React.lazy(() => import("../../component/nowPlaying"));
export default class Movie extends React.Component {
  render() {
    return (
      <div id="main">
        <Header title="电影" />
        <div id="content">
          <Menu></Menu>
          <CacheSwitch>
            <CacheRoute path="/movie/city" component={City}></CacheRoute>
            <CacheRoute
              path="/movie/nowPlaying"
              component={NowPlaying}
            ></CacheRoute>
            <CacheRoute
              path="/movie/search"
              component={Research}
              className="search_box"
            ></CacheRoute>
            <Route path="/">
              <Redirect to="/movie/nowPlaying" />
            </Route>
          </CacheSwitch>
        </div>
      </div>
    );
  }
}
