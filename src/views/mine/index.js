import React from "react";
import TabBar from "../../component/tabbar";
import Header from "../../component/header";

export default class Mine extends React.Component {
  render() {
    return (
      <div>
        <Header title="个人中心" />
        <TabBar />
      </div>
    );
  }
}
