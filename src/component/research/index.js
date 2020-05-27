import React from "react";
import "./index.css";
import { Loading } from "../loading";
import { observer, inject } from "mobx-react";
// import {CityContext} from '@/context/city';
import axios from "axios";
@inject("globalStore")
@observer
class Research extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: "",
      moviesList: [],
    };
    this.globalStore = this.props.globalStore;
    this.handleChange = this.handleChange.bind(this);
    props.cacheLifecycles.didCache(this.componentDidCache)
    props.cacheLifecycles.didRecover(this.componentDidRecover)
  }
  componentDidRecover = () => {
    this.globalStore.changeTabIndex(-1)
    // this.context.changeTabIndex(-1);
  }

  componentDidMount() {
    this.globalStore.changeTabIndex(-1);
    // this.context.changeTabIndex(-1);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.message !== prevState.message) {
      if (this.state.message.length === 0) {
        this.setState({
          moviesList: [],
        });
      } else {
        this.message(this.state.message);
      }
    }
  }
  cancelRequest() {
    if (typeof this.source === "function") {
      this.source("终止请求");
    }
  }
  message(newVal) {
    this.cancelRequest();
    this.setState({
      isLoading: true,
    });
    const cityId = this.globalStore.cityId
    axios
      .get("/api/searchList?cityId=" + cityId + "&kw=" + newVal, {
        cancelToken: new axios.CancelToken((c) => {
          this.source = c;
        }),
      })
      .then((res) => {
        let { msg, data } = res.data;
        if (msg === "ok") {
          this.setState({
            isLoading: false,
            moviesList: data.movies.list,
          });
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Rquest canceled", err.message); //请求如果被取消，这里是返回取消的message
        } else {
          //handle error
          console.log(err);
        }
      });
  }

  handleChange(event) {
    this.setState({
      message: event.target.value,
    });
  }

  render() {
    return (
      <div className="search_body">
        <div className="search_input">
          <div className="search_input_wrapper">
            <i className="iconfont icon-sousuo"></i>
            <input
              type="text"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search_result">
          <h3>电影/电视剧/综艺</h3>
          <Loading Loading={this.state.isLoading} />
          <ul>
            <MovieSearch moviesList={this.state.moviesList} />
          </ul>
        </div>
      </div>
    );
  }
}

// Research.contextType = CityContext;
export default Research;

function MovieSearch(props) {
  const moviesSearch = props.moviesList;
  return moviesSearch.map((item, index) => {
    return (
      <li key={item.id}>
        <div className="img">
          <img src={item.img.replace(/w\.h/g, "128.180")} alt="" />
        </div>
        <div className="info">
          <p>
            <span>{item.nm}</span>
            <span>{item.sc}</span>
          </p>
          <p>{item.enm}</p>
          <p>{item.cat}</p>
          <p>{item.rt}</p>
        </div>
      </li>
    );
  });
}
