import { observable, action } from "mobx";
import api from "@/api";
export default class MovieStore {
  @observable movieList = [];
  @observable comingList = [];
  @observable isLoading = false;
  @observable pullDownMsg = "";
  @observable pullingUp = "";
  @observable screenWidth = window.screen.width * 2;
  @observable prevCityid = -1;
  @observable contentCount = 0;
  @action initData = (cityId) => {
    if (Number(cityId) === this.prevCityid) return;
    this.isLoading = true;
    api.movie
      .movieList({ cityId: cityId })
      .then(([res, res2]) => {
        let { movieList } = res.data.data;
        let { comingList } = res2.data.data;

        this.prevCityid = cityId;
        this.movieList = movieList;
        this.comingList = comingList;
        this.contentCount = movieList.length;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action pullData = (cityId, tabIndex, scroller, type = 0) => {
    type === 0 ? this.pullDownMsg = "正在更新....": this.pullingUp = "正在更新....";
    if (tabIndex === 0) {
      api.movie
        .movieOnList({ cityId: cityId })
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            type === 0 ? scroller.finishPullDown() : scroller.finishPullUp();
            type === 0
              ? (this.pullDownMsg = "更新成功")
              : (this.pullingUp = "更新成功");
            setTimeout(() => {
              this.pullDownMsg = "";
              this.pullingUp = "";
              this.movieList = this.movieList.concat(data.movieList);
              this.contentCount = this.movieList.length;
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.movie
        .movieComingList({ cityId: cityId })
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            type === 0
              ? (this.pullDownMsg = "更新成功")
              : (this.pullingUp = "更新成功");
              type === 0 ? scroller.finishPullDown() : scroller.finishPullUp();
            setTimeout(() => {
              this.comingList = this.comingList.concat(data.comingList);
              this.contentCount = this.comingList.length;
              this.pullDownMsg = "";
              this.pullingUp = "";
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}
