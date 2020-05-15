import {observable,action} from 'mobx'
import api from '../../api'
export default class CinemaStore {
    @observable cinemaList = [];
    @observable isLoading = true;
    @observable pullDownMsg = "";
    @action initData = (cityId) => {
      api.cinema
        .cinemaList({ cityId: cityId })
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            // runInAction("获取内容", () => {
              this.cinemaList = data.cinemas;
            // });
          }
        })
        .catch((err) => {
          console.log(err);
        }).finally(()=>{
          this.isLoading = false;
        })
    };
    @action pullData = (cityId,scroller)=>{
      this.pullDownMsg = '正在更新....';
      api.cinema
        .cinemaList({ cityId: cityId })
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            this.pullDownMsg = '更新成功';
            scroller.finishPullDown();
            setTimeout(() => {
              this.cinemaList = this.cinemaList.concat(data.cinemas);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
          this.pullDownMsg='';
        });
    }
  }
