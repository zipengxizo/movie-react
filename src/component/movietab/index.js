import React from "react";
import { NavLink } from "react-router-dom";
import {CityContext} from '../../context/city'
class MovieTab extends React.Component {
  checkSwitch(index) {
    this.context.changeTabIndex(index)
  }
  render() {
    return (
      <NavLink to="/movie/nowPlaying" className="hot_swtich">
        <div className="hot_swtich">
          <div
            className={`hot_item ${this.context.tabIndex === 0 ? "active" : ""}`}
            onClick={this.checkSwitch.bind(this, 0)}
          >
            正在上映
          </div>
          <div
            className={`hot_item ${this.context.tabIndex === 1 ? "active" : ""}`}
            onClick={this.checkSwitch.bind(this, 1)}
          >
            即将上映
          </div>
        </div>
      </NavLink>
    );
  }
}

MovieTab.contextType = CityContext;
export default MovieTab
