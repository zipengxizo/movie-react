import React from "react";
import BScroll from "better-scroll";
import { observer, inject } from "mobx-react";

// import { CityContext } from "@/context/city";

@inject("globalStore")
@observer
class Scroller extends React.Component {
  constructor(props) {
    super(props);
    this.globalStore = this.props.globalStore;
    this.wrapperRef = React.createRef();
    this.screenHeight = document.documentElement.clientHeight - 144;
    this.flag = true;
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
      if(pos.x === 0 && pos.y === 0 && this.flag){
        this.globalStore.changeTabIndex(0);
        // this.context.changeTabIndex(0);
      }
      else if(pos.x === -window.screen.width && pos.y === 0){
        this.globalStore.changeTabIndex(1);
        // this.context.changeTabIndex(1)
      }
      else{
        this.flag = false;
      }
    });
    this.scroller.on("scroll",()=>{
      this.props.handleforceCheck && this.props.handleforceCheck();
    })
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
// Scroller.contextType = CityContext;
export default Scroller;
