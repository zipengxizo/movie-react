import React from "react";
import { NavLink } from "react-router-dom";
import MovieTab from "../movietab";
import { CityContext } from "../../context/city";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.setState({
        index: this.props.index,
      });
    }
  }
  render() {
    return (
      <CityContext.Consumer>
        {({ cityName }) => (
          <div className="movie_menu">
            <NavLink to="/movie/city" className={`city_name`}>
              <span>{cityName}</span>
              <i className="iconfont icon-lower-triangle"></i>
            </NavLink>
            <MovieTab
              index={this.state.index}
              handleSlide={this.props.handleSlide}
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
