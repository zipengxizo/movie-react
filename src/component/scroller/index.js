import React from "react";
import BScroll from "better-scroll";

import { CityContext } from "../../context/city";

class Scroller extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.screenHeight = document.documentElement.clientHeight - 144;
  }
  componentDidMount() {
    this.scroller = new BScroll(this.wrapperRef.current, {
      click: true,
      probeType: 3,
      scrollX: this.props.scrollX ? true : false,
      pullDownRefresh: {
        threshold: 30,
        stop: 20,
      },
      snap: {
        loop: false,
        threshold: 0.6,
      },
    });
    this.scroller.on("pullingDown", () => {
      this.props.handleToTouchEnd && this.props.handleToTouchEnd(this.scroller);
    });
    this.scroller.on("scrollEnd", (pos) => {
      const tabIndex = pos.x === 0 ? 0 : 1;
      this.context.changeTabIndex(tabIndex);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.scrollX && prevProps.tabIndex !== this.props.tabIndex) {
      this.scroller.goToPage(this.props.tabIndex, 0);
    }
  }
  componentWillUnmount() {
    this.scroller.destroy();
  }
  render() {
    return (
      <div
        className="wrapper"
        style={{ height: this.screenHeight + "px" }}
        ref={this.wrapperRef}
      >
        {this.props.children}
      </div>
    );
  }
}
Scroller.contextType = CityContext;
export default Scroller;
