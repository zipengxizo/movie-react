import React from "react";
import { NavLink } from "react-router-dom";
import MovieTab from "../movietab";
import { CityContext } from "../../context/city";

export default class Menu extends React.Component {
  render() {
    return (
      <CityContext.Consumer>
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
      </CityContext.Consumer>
    );
  }
}
