import React from "react";
import "./index.css";
import { Loading } from "../loading";
import Scroller from "../scroller";
// import { CityContext } from "@/context/city";
import { useHistory} from "react-router-dom";
import { observer, inject } from "mobx-react";
import Model from "../model/index";
import Network from "../network/index";
import LazyLoad,{forceCheck } from "react-lazyload";

@inject("movieStore", "globalStore")
@observer
class NowPlaying extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.movieStore;
    this.globalStore = this.props.globalStore;
    this.handleToTouchEnd = this.handleToTouchEnd.bind(this);
    this.handleforceCheck = this.handleforceCheck.bind(this);
    this.handleReload = this.handleReload.bind(this);
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }
  componentDidMount() {
    // let cityId = this.context.cityId;
    let cityId = this.globalStore.cityId;
    this.store.initData(cityId);
  }
  componentDidRecover = () => {
    if (this.store.prevCityid === this.globalStore.cityId) return;
    this.store.initData(this.globalStore.cityId);
  };

  handleToTouchEnd(scroller) {
    /* let cityId = this.context.cityId;
    let tabIndex = this.context.tabIndex; */
    let cityId = this.globalStore.cityId;
    let tabIndex = this.globalStore.tabIndex;
    this.store.pullData(cityId, tabIndex, scroller);
  }
  handleforceCheck(){
    forceCheck();
  }
  handleReload(e) {
    if (this.globalStore.isNetwork) {
      this.globalStore.hidden();
      let cityId = this.globalStore.cityId;
      this.store.initData(cityId);
    }
  }
  render() {
    let isNetwork = this.globalStore.isNetwork;
    return (
      <React.Fragment>
        <Loading isLoading={this.store.isLoading} />

        <Scroller
          tabIndex={this.globalStore.tabIndex}
          scrollX
          handleToTouchEnd={this.handleToTouchEnd}
          handleforceCheck={this.handleforceCheck}
        >
          <div
            className="scrollX"
            onClick={this.handleReload}
            style={{ width: this.store.screenWidth + "px" }}
          >
            {isNetwork && (
              <Model>
                <Network />
              </Model>
            )}
            <div className="movie_body" style={{ width: window.screen.width }}>
              <Scroller handleToTouchEnd={this.handleToTouchEnd}>
                <ul>
                  <li className="pullDown">{this.store.pullDownMsg}</li>
                  <MovieItem movieList={this.store.movieList} />
                </ul>
              </Scroller>
            </div>

            <div className="movie_body" style={{ width: window.screen.width }}>
              <Scroller handleToTouchEnd={this.handleToTouchEnd}>
                <ul>
                  <li className="pullDown">{this.store.pullDownMsg}</li>
                  <MovieComingItem comingList={this.store.comingList} />
                </ul>
              </Scroller>
            </div>
          </div>
        </Scroller>
      </React.Fragment>
    );
  }
}
// NowPlaying.contextType = CityContext;
export default NowPlaying;

function MovieComingItem(props) {
  let history = useHistory();
  function goDetail(movieId) {
    history.push(`/detail/${movieId}`);
  }
  const comingList = props.comingList;
  // console.log(comingList.toJS())
  return comingList.map((item, index) => {
    return (
      <li key={index}>
        <div className="pic_show">
          <LazyLoad height={60} once offset={60} placeholder={<Loading isLoading position />}>
            <img
              onClick={goDetail.bind(null, item.id)}
              src={item.img.replace(/w\.h/, "128.180")}
              alt=""
            />
          </LazyLoad>
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
          <LazyLoad height={60} once offset={60} placeholder={<Loading isLoading position />}>
            <img
              onClick={goDetail.bind(null, item.id)}
              src={item.img.replace(/w\.h/, "128.180")}
              alt=""
            />
          </LazyLoad>
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
