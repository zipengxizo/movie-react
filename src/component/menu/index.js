import React from 'react'
import { NavLink } from 'react-router-dom'


export default class Menu extends React.Component {
    render(){
        return (
            <div className="movie_menu">
                <NavLink to="/movie/city">
                    <div className="city_name">
                        <span>北京</span><i className="iconfont icon-lower-triangle"></i>
                    </div>
                </NavLink>
                <div className="hot_swtich">
                    <NavLink to="/movie/nowPlaying">
                        <div className="hot_item">正在上映</div>
                    </NavLink>
                    <NavLink to="/movie/comingSoon">
                        <div className="hot_item">即将上映</div>
                    </NavLink>
                </div>
                <NavLink to="/movie/search">
                    <div className="search_entry">
                        <i className="iconfont icon-sousuo"></i>
                    </div>
                </NavLink>
        </div>
        )
    }
}