import React from "react";
import { NavLink } from "react-router-dom";
import MovieTab from "../movietab";
// import { CityContext } from "../../context/city";

import { observer, inject } from "mobx-react";

@inject("globalStore")
@observer
class Menu extends React.Component {
  constructor(props){
    super(props)
    this.globalStore = this.props.globalStore;
  }
  render() {
    return (
          <div className="movie_menu">
            <NavLink to="/movie/city" className={`city_name`}>
              <span>{this.globalStore.cityName}</span>
              <i className="iconfont icon-lower-triangle"></i>
            </NavLink>
            <MovieTab />
            <NavLink to="/movie/search" className={`search_entry`}>
              <i className="iconfont icon-sousuo"></i>
            </NavLink>
          </div>
    );
  }
}

export default Menu;

/* <CityContext.Consumer>
{({ cityName,tabIndex }) => (
  <div className="movie_menu">
    <NavLink to="/movie/city" className={`city_name`}>
      <span>{cityName}</span>
      <i className="iconfont icon-lower-triangle"></i>
    </NavLink>
    <MovieTab
      index={tabIndex}
    />
    <NavLink to="/movie/search" className={`search_entry`}>
      <i className="iconfont icon-sousuo"></i>
    </NavLink>
  </div>
)}
</CityContext.Consumer> */
