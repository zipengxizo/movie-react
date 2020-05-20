import { observable, action } from "mobx";

export default class Global {
  @observable isNetwork = false;
  @observable cityId = window.localStorage.getItem("nowId") || 1;
  @observable cityName = window.localStorage.getItem("nowNm") || '北京';
  @observable tabIndex = 0;
  @action hidden = () => {
    this.isNetwork = false;
  };
  @action show = () => {
    this.isNetwork = true;
  };
  @action changeCityId = (cityId,cityName)=>{
    this.cityId = cityId;
    this.cityName = cityName;
  }
  @action changeTabIndex = (index)=>{
    this.tabIndex = index;
  }
}
