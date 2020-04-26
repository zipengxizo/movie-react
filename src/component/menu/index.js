import React from 'react'
import { NavLink } from 'react-router-dom'


export default class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="movie_menu">
                <NavLink to="/movie/city" className={`city_name ${this.props.selectBabIndex===2 ? 'active':''}`}>
                    <span>北京</span><i className="iconfont icon-lower-triangle"></i>
                </NavLink>
                <div className="hot_swtich">
                    <NavLink to="/movie/nowPlaying" className={`hot_item ${this.props.selectBabIndex===0 ? 'active':''}`}>
                        正在上映
                    </NavLink>
                    <NavLink to="/movie/comingSoon" className={`hot_item ${this.props.selectBabIndex===1 ? 'active':''}`}>
                        即将上映
                    </NavLink>
                </div>
                <NavLink to="/movie/search" className={`search_entry ${this.props.selectBabIndex===3 ? 'active':''}`}>
                    <i className="iconfont icon-sousuo"></i>
                </NavLink>
        </div>
        )
    }
}