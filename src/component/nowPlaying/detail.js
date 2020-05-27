import React from "react";
import Header from "../header";
import { Loading } from "../loading";
import "./detail.css";
import api from "@/api";
import { withRouter} from 'react-router-dom'


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      detailMovie: null,
    };
    this.detailPlayer = React.createRef();
    this.handleToBack = this.handleToBack.bind(this);
  }

  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    api.movie
      .movieDetail({ movieId: movieId })
      .then((res) => {
        const { msg, data } = res.data;
        if (msg === "ok") {
          this.setState({
            isLoading: false,
            detailMovie: data.detailMovie,
          });
          this.swiperdemo = new window.Swiper(this.detailPlayer.current, {
            slidesPerView: "auto",
            freeMode: true,
            freeModeSticky: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          isLoading:false
        })
      });
  }
  handleToBack() {
    // history('/movie/nowPlaying');
    this.props.history.push('/movie/nowPlaying');
    // this.props.history.go(-1)
  }

  render() {
    if (this.state.detailMovie) {
      return (
        <div id="detailContrainer" className="slide-enter-active">
          <Header title="影片详情">
            <i className="iconfont icon-right" onClick={this.handleToBack}></i>
          </Header>
          <div id="content" className="contentDetail">
            <div className="detail_list">
              <div
                className="detail_list_bg"
                style={{
                  backgroundImage: `url('${this.state.detailMovie.img.replace(
                    /w\.h/g,
                    "148.208"
                  )}')`,
                }}
              ></div>
              <div className="detail_list_filter"></div>
              <div className="detail_list_content">
                <div className="detail_list_img">
                  <img
                    src={this.state.detailMovie.img.replace(/w\.h/g, "140.127")}
                    alt=""
                  />
                </div>
                <div className="detail_list_info">
                  <h2>{this.state.detailMovie.nm}</h2>
                  <p>{this.state.detailMovie.enm}</p>
                  <p>{this.state.detailMovie.sc}</p>
                  <p>{this.state.detailMovie.cat}</p>
                  <p>{this.state.detailMovie.srcAnddur}</p>
                  <p>{this.state.detailMovie.pubDesc}</p>
                </div>
              </div>
            </div>
            <div className="detail_intro">
              <p>{this.state.detailMovie.dra}</p>
            </div>
            <div
              className="detail_player swiper-container"
              ref={this.detailPlayer}
            >
              <ul className="swiper-wrapper">
                <DetailPhotos photos={this.state.detailMovie.photos} />
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading isLoading />;
    }
  }
}

function DetailPhotos(props) {
  const detailPhotos = props.photos;
  return detailPhotos.map((item, index) => {
    return (
      <li className="swiper-slide" key={index}>
        <div>
          <img src={item.replace(/w\.h/g, "140.127")} alt="" />
        </div>
      </li>
    );
  });
}


export default withRouter(Detail);