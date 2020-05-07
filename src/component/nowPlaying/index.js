import React from "react";
import axios from "axios";
import "./index.css";
import { Loading } from "../loading";
import Scroller from "../scroller";
import { Link } from "react-router-dom";
import { CityContext } from "../../context/city";

class NowPlaying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      comingList: [],
      isLoading: true,
      pullDownMsg: "",
      screenWidth: window.screen.width * 2,
      index: 0,
    };
    this.handleToTouchEnd = this.handleToTouchEnd.bind(this);
  }
  componentDidMount() {
    const cityId = this.context.cityId;
    axios.get(`/api/movieOnInfoList?cityId=${cityId}`).then((res) => {
      this.setState({
        movieList: res.data.data.movieList,
        isLoading: false,
      });
    }).catch((err)=>{
      console.log(err);
      throw new Error('接口连接失败');
    });
    axios.get(`/api/movieComingList?cityId=${cityId}`).then((res) => {
      this.setState({
        comingList: res.data.data.comingList,
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.index !== this.props.index ||
      this.state.index !== this.props.index
    ) {
      this.setState({
        index: this.props.index,
      });
    }
  }

  handleToTouchEnd(scroller) {
    this.setState({
      pullDownMsg: "正在更新....",
    });
    let cityId = this.context.cityId;
    const url =
      this.state.index === 0 ? "/api/movieOnInfoList" : "/api/movieComingList";
    axios
      .get(`${url}?cityId=${cityId}`)
      .then((res) => {
        let { msg, data } = res.data;
        if (msg === "ok") {
          this.setState({ pullDownMsg: "更新成功" });
          scroller.finishPullDown();
          setTimeout(() => {
            if (this.state.index === 0) {
              this.setState({
                movieList: [...data.movieList, ...this.state.movieList],
                pullDownMsg: "",
              });
            } else {
              this.setState({
                comingList: [...data.comingList, ...this.state.comingList],
                pullDownMsg: "",
              });
            }
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    return (
        <Scroller
          tabIndex={this.state.index}
          scrollX
          handleToTouchEnd={this.handleToTouchEnd}
          handleSlide={this.props.handleSlide}
        >
          <div
            className="scrollX"
            style={{ width: this.state.screenWidth + "px" }}
          >
            <div className="movie_body" style={{ width: window.screen.width }}>
              <Loading isLoading={this.state.isLoading} />
              <Scroller handleToTouchEnd={this.handleToTouchEnd}>
                <ul>
                  <li className="pullDown">{this.state.pullDownMsg}</li>
                  <MovieItem movieList={this.state.movieList} />
                </ul>
              </Scroller>
            </div>

            <div className="movie_body" style={{ width: window.screen.width }}>
              <Loading isLoading={this.state.isLoading} />
              <Scroller handleToTouchEnd={this.handleToTouchEnd}>
                <ul>
                  <li className="pullDown">{this.state.pullDownMsg}</li>
                  <MovieComingItem comingList={this.state.comingList} />
                </ul>
              </Scroller>
            </div>
          </div>
        </Scroller>
    );
  }
}

NowPlaying.contextType = CityContext;
export default NowPlaying

function MovieComingItem(props) {
  const comingList = props.comingList;
  return comingList.map((item,index)=>{
    return (
      <li key={index}>
        <Link to={`/detail/${item.id}`} className="pic_show">
          <img src={item.img.replace(/w\.h/, "128.180")} alt="" />
        </Link>
        <div className="info_list">
          <h2>{item.nm}</h2>
          <p>
            观众评
            <span className="grade">{item.sc}</span>
          </p>
          <p>主演: {item.star}</p>
          <p>{item.showInfo}</p>
        </div>
        <div className="btn_pre">预售</div>
      </li>
    )
  })
}

function MovieItem(props) {
  const movieList = props.movieList;
  return movieList.map((item, index) => {
    return (
      <li key={index}>
        <Link to={`/detail/${item.id}`} className="pic_show">
          <img src={item.img.replace(/w\.h/, "128.180")} alt="" />
        </Link>
        <div className="info_list">
          <h2>{item.nm}</h2>
          <p>
            观众评
            <span className="grade">{item.sc}</span>
          </p>
          <p>主演: {item.star}</p>
          <p>{item.showInfo}</p>
        </div>
        <div className="btn_mall">购票</div>
      </li>
    );
  });
}
