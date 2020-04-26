import React from "react";

import {
  Switch,
  Route,
  Redirect
  // useRouteMatch,
} from "react-router-dom";

import TabBar from "../../component/tabbar";
import NowPlaying from "../../component/nowPlaying";
import Header from "../../component/header";
import "./index.css";
import Menu from "../../component/menu";
export default class Movie extends React.Component {
  constructor(props){
    super(props)
    this.tabIndex = 0
    this.state = {
      selectBabIndex : -1
    }
    this.handleSlide = this.handleSlide.bind(this);
  }
  handleSlide(tabIndex){
    this.setState({
      selectBabIndex : tabIndex
    })
  }
  render() {
    return (
      <div id="main">
        <Header title="电影" />
        <div id="content">
          <Menu selectBabIndex={this.state.selectBabIndex} />
          <Switch>
            <Route path="/movie/city">
              <div>city</div>
            </Route>
            <Route path="/movie/nowPlaying">
              <NowPlaying tabIndex={this.tabIndex} handleSlide={this.handleSlide} />
            </Route>
            <Route path="/movie/comingSoon">
              <NowPlaying tabIndex={this.tabIndex + 1 } handleSlide={this.handleSlide} />
            </Route>
            <Route path="/movie/search">
              <div>research</div>
            </Route>
            <Route path="/">
              <Redirect to="/movie/nowPlaying" />
            </Route>
          </Switch>
        </div>
        <TabBar />
      </div>
    );
  }
}

/* function Menudiv({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <div className={match ? "active" : ""}>
      <div to={to}>{label}</div>
    </div>
  );
}
 */