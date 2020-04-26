import React from "react";
import "./index.css";
import { Loading } from "../loading";
import axios from "axios";
import Scroller from "../scroller";

export default class CinemaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cinemaList: [],
      isLoading: true,
      pullDownMsg: "",
    };
  }
  componentDidMount() {
    const cityId = 10;
    axios
      .get(`/api/cinemaList?cityId=${cityId}`)
      .then((res) => {
        let { msg, data } = res.data;
        if (msg === "ok") {
          this.setState({
            isLoading: false,
            cinemaList: data.cinemas,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }
  handleToTouchEnd(scroller) {
      let cityId = 10;
      this.setState({
          pullDownMsg:'正在更新....'
      })
      axios
        .get(`/api/cinemaList?cityId=${cityId}`)
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            this.setState({ pullDownMsg: "更新成功" });
            scroller.finishPullDown();
            setTimeout(() => {
              this.setState({
                cinemaList: [...data.cinemas, ...this.state.cinemaList],
                pullDownMsg: "",
              });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
  }

  render() {
    return (
      <div className="cinema_body">
        <Loading isLoading={this.state.isLoading} />
        <Scroller
          handleToTouchEnd={this.handleToTouchEnd}
        >
          <ul>
            <li className="pullDown">{this.state.pullDownMsg}</li>
            <CinemaItem cinemaList={this.state.cinemaList} />
          </ul>
        </Scroller>
      </div>
    );
  }
}

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
          <div>{}</div>
        </div>
      </li>
    );
  });
}
