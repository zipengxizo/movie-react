import React from "react";
import "./index.css";
import { Loading } from "../loading";
import Scroller from "../scroller";
import api from '../../api'
import { CityContext } from "../../context/city";

class CinemaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cinemaList: [],
      isLoading: true,
      pullDownMsg: "",
    };
    this.handleToTouchEnd = this.handleToTouchEnd.bind(this)
  }
  componentDidMount() {
    const cityId = this.context.cityId;
    api.cinema.cinemaList({cityId:cityId})
      .then((res) => {
        let { msg, data } = res.data;
        if (msg === "ok") {
          this.setState({
            isLoading: false,
            cinemaList: data.cinemas,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  shouldComponentUpdate(nextProps,nextState){
    /* console.log(nextState.cinemaList)
    console.log(this.state.cinemaList)
    console.log(nextState.cinemaList === this.state.cinemaList) */
    return true
  }
  handleToTouchEnd(scroller) {
      let cityId = this.context.cityId;
      this.setState({
          pullDownMsg:'正在更新....'
      })
      api.cinema.cinemaList({cityId:cityId})
        .then((res) => {
          let { msg, data } = res.data;
          if (msg === "ok") {
            this.setState({ pullDownMsg: "更新成功" });
            scroller.finishPullDown();
            setTimeout(() => {
              this.setState({
                cinemaList: [...data.cinemas, ...this.state.cinemaList],
                pullDownMsg: "",
              });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        }).finally(()=>{
          this.setState({
            isLoading : false
          })
        })
  }

  render() {
    console.log(1111)
    return (
      <div className="cinema_body">
        <Loading isLoading={this.state.isLoading} />
        <Scroller
          handleToTouchEnd={this.handleToTouchEnd}
        >
          <ul>
            <li className="pullDown" style={{textAlign:'center'}}>{this.state.pullDownMsg}</li>
            <CinemaItem cinemaList={this.state.cinemaList} />
          </ul>
        </Scroller>
      </div>
    );
  }
}

CinemaList.contextType = CityContext
export default  CinemaList

function CinemaItem(props) {
  const cinemaList = props.cinemaList;
  return cinemaList.map((item, index) => {
    return (
      <li key={index}>
        <div>
          <span>{item.nm}</span>
          <span className="q">
            <span className="price">{item.sellPrice}</span> 元起
          </span>
        </div>
        <div className="address">
          <span>{item.addr}</span>
          <span>{item.distance}</span>
        </div>
        <div className="card">
          <Card tags={item.tag} />
        </div>
      </li>
    );
  });
}

function Card(props) {
  const tags = props.tags;
  return Object.keys(tags).filter((item)=>{
    return tags[item] === 1
  }).map((item,index)=>{
    const cardText = formatCard(item);
    const classText = classCard(item);
    return <div key={index} className={classText}>{cardText}</div>
  })
}


function formatCard(key){
  var card = [
      { key : 'allowRefund' , value : '改签' },
      { key : 'endorse' , value : '退' },
      { key : 'sell' , value : '折扣卡' },
      { key : 'snack' , value : '小吃'}
  ];
  for(var i=0;i<card.length;i++){
      if(card[i].key === key){
          return card[i].value;
      }
  }
  return '';
}
function classCard(key){
  var card = [
      { key : 'allowRefund' , value : 'bl' },
      { key : 'endorse' , value : 'bl' },
      { key : 'sell' , value : 'or' },
      { key : 'snack' , value : 'or'}
  ];
  for(var i=0;i<card.length;i++){
      if(card[i].key === key){
          return card[i].value;
      }
  }
  return '';
}