import {observable,action} from 'mobx'
import api from '@/api'
export default class CinemaStore {
    @observable cinemaList = [];
    @observable isLoading = true;
    @observable pullDownMsg = "";
    @observable preCityId = -1;
    @action initData = (cityId) => {
      if(Number(cityId) === this.preCityId) return false;
      this.isLoading = true;
      api.cinema
        .cinemaList({ cityId: cityId })
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
              this.cinemaList = data.cinemas;
              this.preCityId = cityId;
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
