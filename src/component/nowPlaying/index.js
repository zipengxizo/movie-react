import React from 'react'
import axios from 'axios'
import './index.css'
import { Loading } from '../loading';
import Scroller from '../scroller';

export default class NowPlaying extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movieList: [],
        isLoading:true,
        pullDownMsg:''
      };
      this.handleToScroll = this.handleToScroll.bind(this);
      this.handleToTouchEnd = this.handleToTouchEnd.bind(this);
    }
    componentDidMount() {
        axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
            this.setState({
                movieList:res.data.data.movieList,
                isLoading : false
            });
        });
    }
    handleToScroll(pos) {
        if (pos.y > 30) {
          this.setState({pullDownMsg:'正在更新....'})
        }
      }
    handleToTouchEnd(pos) {
        if (pos.y > 30) {
            let cityId = 10;
            axios.get(`/api/movieOnInfoList?cityId=${cityId}`)
            .then(res => {
                let {msg,data} = res.data;
                if (msg === "ok") {
                this.setState({pullDownMsg:'更新成功'})
                setTimeout(() => {
                    this.setState({
                        movieList: [...data.movieList,...this.state.movieList],
                        pullDownMsg:''
                    })
                }, 1000);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=>{
            });
        }
    }
    render(){
        return (
            <div className="movie_body" ref="movie_body">
                <Scroller handleToScroll={this.handleToScroll} handleToTouchEnd={this.handleToTouchEnd}>
                    <ul>
                        <Loading isLoading={this.state.isLoading} />
                        <li className="pullDown">{ this.state.pullDownMsg }</li>
                        <MovieItem movieList={this.state.movieList} />
                    </ul>
                </Scroller>
          </div>
        )
    }
}
function MovieItem(props) {
    const movieList = props.movieList;
    return movieList.map((item,index)=>{
        return (
            <li key={index}>
                <div className="pic_show">
                    <img src={item.img.replace(/w\.h/, '128.180')}/>
                </div>
                <div className="info_list">
                    <h2 >
                        {item.nm}
                    </h2>
                    <p>
                        观众评
                        <span className="grade">{item.sc}</span>
                    </p>
                    <p>主演: {item.star}</p>
                    <p>{item.showInfo}</p>
                </div>
                <div className="btn_mall">购票</div>
            </li>
        )
    })
}

