

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
export default class Movie extends React.Component {
    render() {
        return (
            <div id="main">
                <Header title="电影" />
                <div id="content">
                    <div className="movie_menu">
                        <div className="city_name">
                            <Link to="/movie/city">
                                <span>北京</span><i className="iconfont icon-lower-triangle"></i>
                            </Link>
                        </div>
                        <div className="hot_swtich">
                            <Link to="/movie/nowPlaying">
                                <div className="hot_item">正在上映</div>
                            </Link>
                            <Link to="/movie/comingSoon">
                                <div className="hot_item">即将上映</div>
                            </Link>
                        </div>
                        <div className="search_entry">
                            <Link to="/movie/search">
                                <i className="iconfont icon-sousuo"></i>
                            </Link>
                        </div>
                    </div>
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