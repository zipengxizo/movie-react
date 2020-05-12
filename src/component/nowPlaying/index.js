import React from "react";
import "./index.css";
import { Loading } from "../loading";
import Scroller from "../scroller";
import { CityContext } from "../../context/city";
import { useHistory } from "react-router-dom";
import api from "../../api";
class NowPlaying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      comingList: [],
      isLoading: true,
      pullDownMsg: "",
      screenWidth: window.screen.width * 2,
      prevCityid: -1,
    };
    this.handleToTouchEnd = this.handleToTouchEnd.bind(this);
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }
  componentDidMount() {
    this.fetchMovies();
  }
  componentDidCache = () => {
    console.log("movie cached");
  };

  componentDidRecover = () => {
    console.log("movie recovered");
    if (this.state.prevCityid === this.context.cityId) return;
    this.setState({
      isLoading: true,
    });
    this.fetchMovies();
  };

  fetchMovies() {
    const cityId = this.context.cityId;
    api.movie
      .movieOnList({ cityId: cityId })
      .then((res) => {
        this.setState({
          movieList: res.data.data.movieList,
          prevCityid: this.context.cityId,
        });
      })
      .catch((err) => {
        console.log(err);
        throw new Error("接口连接失败");
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
    api.movie
      .movieComingList({ cityId: cityId })
      .then((res) => {
        this.setState({
          comingList: res.data.data.comingList,
        });
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
    this.setState({
      pullDownMsg: "正在更新....",
    });
    let para = { cityId: this.context.cityId };
    if (this.context.tabIndex === 0) {
      api.movie
        .movieOnList(para)
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            this.setState({ pullDownMsg: "更新成功" });
            scroller.finishPullDown();
            this.setState({
              movieList: [...data.movieList, ...this.state.movieList],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({
            pullDownMsg: "",
          });
        });
    } else {
      api.movie
        .movieComingList(para)
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            this.setState({ pullDownMsg: "更新成功" });
            scroller.finishPullDown();
            this.setState({
              comingList: [...data.comingList, ...this.state.comingList],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setState({
            pullDownMsg: "",
          });
        });
    }
  }
  render() {
    return (
      <Scroller
        tabIndex={this.context.tabIndex}
        scrollX
        handleToTouchEnd={this.handleToTouchEnd}
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
export default NowPlaying;

function MovieComingItem(props) {
  let history = useHistory();
  function goDetail(movieId) {
    history.push(`/detail/${movieId}`);
  }
  const comingList = props.comingList;
  return comingList.map((item, index) => {
    return (
      <li key={index}>
        <div className="pic_show">
          <img
            src={item.img.replace(/w\.h/, "128.180")}
            onClick={goDetail.bind(null, item.id)}
            alt=""
          />
        </div>
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
    );
  });
}

function MovieItem(props) {
  let history = useHistory();
  function goDetail(movieId) {
    history.push(`/detail/${movieId}`);
  }
  const movieList = props.movieList;
  return movieList.map((item, index) => {
    return (
      <li key={index}>
        <div className="pic_show">
          <img
            src={item.img.replace(/w\.h/, "128.180")}
            onClick={goDetail.bind(null, item.id)}
            alt=""
          />
        </div>
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
