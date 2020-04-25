

import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

import TabBar from '../../component/tabbar'
import NowPlaying from '../../component/nowPlaying'

import Header from '../../component/header'
import './index.css'
import Menu from '../../component/menu';
export default class Movie extends React.Component {
    render() {
        return (
            <div id="main">
                <Header title="电影" />
                <div id="content">
                    <Menu />
                    <Switch>
                        <Route path="/movie/city">
                            <div>
                                city
                            </div>
                        </Route>
                        <Route path="/movie/nowPlaying">
                            <NowPlaying />
                        </Route>
                        <Route path="/movie/comingSoon">
                            <div>commingSoon</div>
                        </Route>
                        <Route path="/movie/search">
                            <div>
                                research
                            </div>
                        </Route>
                        <Route path="/">
                            <NowPlaying />
                        </Route>
                    </Switch>
                </div>
                
                <TabBar />
            </div>
        )
    }
}

function Menudiv({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
    });
  
    return (
      <div className={match ? "active" : ""}>
        <div to={to}>{label}</div>
      </div>
    );
  }