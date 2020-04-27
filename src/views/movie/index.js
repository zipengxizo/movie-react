import React from "react";

import {
  Switch,
  Route,
  Redirect,
  // useRouteMatch,
} from "react-router-dom";

import TabBar from "../../component/tabbar";
import NowPlaying from "../../component/nowPlaying";
import Header from "../../component/header";
import "./index.css";
import Menu from "../../component/menu";
import Research from "../../component/research";
import City from "../../component/city";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.handleSlide = this.handleSlide.bind(this);
  }
  handleSlide(index) {
    this.setState({
      index: index,
    });
  }
  render() {
    return (
      <div id="main">
        <Header title="电影" />
        <div id="content">
          <Menu index={this.state.index} handleSlide={this.handleSlide} />
          <Switch>
            <Route path="/movie/city">
              <City handleSlide={this.handleSlide} />
            </Route>
            <Route path="/movie/nowPlaying">
              <NowPlaying
                index={this.state.index}
                handleSlide={this.handleSlide}
              />
            </Route>
            <Route path="/movie/search">
              <Research handleSlide={this.handleSlide} />
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
