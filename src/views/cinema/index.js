import React from "react";
import TabBar from "../../component/tabbar";
import Header from "../../component/header";
import CinemaList from "../../component/cinema";

import './index.css';

export default class Cinema extends React.Component {
  
  render() {
    return (
      <div id="main">
        <Header title="影院" />
        <div id="content">
          <div className="cinema_menu">
            <div className="city_switch">
              全城 <i className="iconfont icon-lower-triangle"></i>
            </div>
            <div className="brand_swtich">
              品牌 <i className="iconfont icon-lower-triangle"></i>
            </div>
            <div className="feature_switch">
              特色 <i className="iconfont icon-lower-triangle"></i>
            </div>
          </div>
          <CinemaList />
        </div>
        <TabBar />
      </div>
    );
  }
}
