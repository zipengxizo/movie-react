import React from "react";
import Header from "@/component/header";
import "./index.css";
import { Loading } from "@/component/loading";
import Scroller from "@/component/scroller";
// import { CityContext } from "@/context/city";
import Model from "@/component/model";
import Network from "@/component/network";
import { observer, inject } from "mobx-react";

@inject("cinemaStore", "globalStore")
@observer
class Cinema extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.cinemaStore;
    this.globalStore = this.props.globalStore;
    this.handleToTouchEnd = this.handleToTouchEnd.bind(this);
    this.handleReload = this.handleReload.bind(this);
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }
  componentDidRecover = () => {
    if (this.store.prevCityid === this.globalStore.cityId) return;
    this.store.initData(this.globalStore.cityId);
  };

  componentDidMount() {
    // const cityId = this.context.cityId;
    const cityId = this.globalStore.cityId;
    this.store.initData(cityId);
  }
  handleToTouchEnd(scroller) {
    // let cityId = this.context.cityId;
    const cityId = this.globalStore.cityId;
    this.store.pullData(cityId, scroller);
  }
  handleReload() {
    if (this.globalStore.isNetwork) {
      this.globalStore.hidden();
      // let cityId = this.context.cityId;
      let cityId = this.globalStore.cityId;
      this.store.initData(cityId);
    }
  }

  render() {
    let isNetwork = this.globalStore.isNetwork;
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
          <div className="cinema_body" onClick={this.handleReload}>
            <Loading isLoading={this.store.isLoading} />
            {isNetwork && (
              <Model>
                <Network />
              </Model>
            )}
            <Scroller handleToTouchEnd={this.handleToTouchEnd}>
              <ul>
                <li className="pullDown" style={{ textAlign: "center" }}>
                  {this.store.pullDownMsg}
                </li>
                <CinemaItem cinemaList={this.store.cinemaList} />
              </ul>
            </Scroller>
          </div>
        </div>
      </div>
    );
  }
}

// Cinema.contextType = CityContext;
export default Cinema;

function CinemaItem(props) {
  const cinemaList = props.cinemaList;
  return cinemaList.map((item, index) => {
    return (
      <li key={index}>
        <div>
          <span>{item.nm}</span>
          <span className="q">
            <span className="price">{item.sellPrice}</span> 元起
          </span>
        </div>
        <div className="address">
          <span>{item.addr}</span>
          <span>{item.distance}</span>
        </div>
        <div className="card">
          <Card tags={item.tag} />
        </div>
      </li>
    );
  });
}

function Card(props) {
  const tags = props.tags;
  return Object.keys(tags)
    .filter((item) => {
      return tags[item] === 1;
    })
    .map((item, index) => {
      const cardText = formatCard(item);
      const classText = classCard(item);
      return (
        <div key={index} className={classText}>
          {cardText}
        </div>
      );
    });
}

function formatCard(key) {
  var card = [
    { key: "allowRefund", value: "改签" },
    { key: "endorse", value: "退" },
    { key: "sell", value: "折扣卡" },
    { key: "snack", value: "小吃" },
  ];
  for (var i = 0; i < card.length; i++) {
    if (card[i].key === key) {
      return card[i].value;
    }
  }
  return "";
}
function classCard(key) {
  var card = [
    { key: "allowRefund", value: "bl" },
    { key: "endorse", value: "bl" },
    { key: "sell", value: "or" },
    { key: "snack", value: "or" },
  ];
  for (var i = 0; i < card.length; i++) {
    if (card[i].key === key) {
      return card[i].value;
    }
  }
  return "";
}
