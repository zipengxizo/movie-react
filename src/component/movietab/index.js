import React from "react";
import { NavLink } from "react-router-dom";
import { observer, inject } from "mobx-react";
// import {CityContext} from '@/context/city'

@inject("globalStore")
@observer
class MovieTab extends React.Component {
  constructor(props){
    super(props);
    this.globalStore = this.props.globalStore;
  }
  checkSwitch(index) {
    // this.context.changeTabIndex(index);
    this.globalStore.changeTabIndex(index);
  }
  render() {
    return (
      <NavLink to="/movie/nowPlaying" className="hot_swtich">
        <div className="hot_swtich">
          <div
            className={`hot_item ${this.globalStore.tabIndex === 0 ? "active" : ""}`}
            onClick={this.checkSwitch.bind(this, 0)}
          >
            正在上映
          </div>
          <div
            className={`hot_item ${this.globalStore.tabIndex === 1 ? "active" : ""}`}
            onClick={this.checkSwitch.bind(this, 1)}
          >
            即将上映
          </div>
        </div>
      </NavLink>
    );
  }
}

// MovieTab.contextType = CityContext;
export default MovieTab
