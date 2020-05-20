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
    api.movie.movieList({cityId:cityId}).then(([res,res2])=>{
      let {movieList} = res.data.data;
      let {comingList} = res2.data.data;

      this.prevCityid = this.cityId;
      this.movieList = movieList;
      this.comingList = comingList;
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
