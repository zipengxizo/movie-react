import { observable, action } from "mobx";
import api from "../../api";
export default class MovieStore {
  @observable movieList = [];
  @observable comingList = [];
  @observable isLoading = false;
  @observable pullDownMsg = "";
  @observable screenWidth = window.screen.width * 2;
  @observable prevCityid = -1;
  @action initData = (cityId) => {
    this.isLoading = true;
    api.movie
      .movieOnList({ cityId: cityId })
      .then((res) => {
        this.movieList = res.data.data.movieList;
        this.prevCityid = this.cityId;
      })
      .catch((err) => {
        console.log(err);
        throw new Error("接口连接失败");
      })
      .finally(() => {
        this.isLoading = false;
      });
    api.movie
      .movieComingList({ cityId: cityId })
      .then((res) => {
        this.comingList = res.data.data.comingList;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  };

  @action pullData = (cityId, tabIndex, scroller) => {
    this.pullDownMsg = "正在更新....";
    if (tabIndex === 0) {
      api.movie
        .movieOnList({ cityId: cityId })
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            scroller.finishPullDown();
            this.pullDownMsg = "更新成功";
            this.movieList = this.movieList.concat(data.movieList);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.pullDownMsg = "";
        });
    } else {
      api.movie
        .movieComingList({ cityId: cityId })
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
              this.pullDownMsg = "更新成功";
              scroller.finishPullDown();
              this.comingList = data.comingList.concat(this.comingList);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.pullDownMsg = "";
        });
    }
  };
}
