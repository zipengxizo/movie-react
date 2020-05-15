import React from "react";
import "./index.css";
import { Loading } from "../loading";
import Scroller from "../scroller";
import { CityContext } from "../../context/city";
import { observer,inject} from "mobx-react";

@inject('cinemaStore')
@observer
class CinemaList extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.cinemaStore;
    this.handleToTouchEnd = this.handleToTouchEnd.bind(this);
  }
  componentDidMount() {
    const cityId = this.context.cityId;
    this.store.initData(cityId);
  }
  handleToTouchEnd(scroller) {
    let cityId = this.context.cityId;
    this.store.pullData(cityId,scroller);
    
  }

  render() {
    console.log(this.store.cinemaList);
    return (
      <div className="cinema_body">
        <Loading isLoading={this.store.isLoading} />
        <Scroller handleToTouchEnd={this.handleToTouchEnd}>
          <ul>
            <li className="pullDown" style={{ textAlign: "center" }}>
              {this.store.pullDownMsg}
            </li>
            <CinemaItem cinemaList={this.store.cinemaList} />
          </ul>
        </Scroller>
      </div>
    );
  }
}

CinemaList.contextType = CityContext;
export default CinemaList;

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
