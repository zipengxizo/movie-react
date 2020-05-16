import { observable, action } from "mobx";

export default class Global {
  @observable isNetwork = false;
  @action toggle = () => {
    this.isNetwork = !this.isNetwork;
  };
}
