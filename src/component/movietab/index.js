import React from "react";
import { NavLink } from "react-router-dom";

export default class MovieTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  checkSwitch(index) {
    this.setState({
      index: index,
    });
    this.props.handleSlide && this.props.handleSlide(index);
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
      <NavLink to="/movie/nowPlaying" className="hot_swtich">
        <div className="hot_swtich">
          <div
            className={`hot_item ${this.state.index === 0 ? "active" : ""}`}
            onClick={this.checkSwitch.bind(this, 0)}
          >
            正在上映
          </div>
          <div
            className={`hot_item ${this.state.index === 1 ? "active" : ""}`}
            onClick={this.checkSwitch.bind(this, 1)}
          >
            即将上映
          </div>
        </div>
      </NavLink>
    );
  }
}
