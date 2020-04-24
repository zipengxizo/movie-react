import React from 'react'
import axios from 'axios'
import './index.css'
import { Loading } from '../loading';

export default class NowPlaying extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movieList: [],
        isLoading:true
      };
    }
    componentDidMount() {
        axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
            this.setState({
                movieList:res.data.data.movieList,
                isLoading : false
            });

        });
    }
    render(){
        return (
            <div className="movie_body" ref="movie_body">
                <Loading isLoading={this.state.isLoading} />
                <ul>
                    <MovieItem movieList={this.state.movieList} />
                </ul>
          </div>
        )
    }
}
function MovieItem(props) {
    const movieList = props.movieList;
    return movieList.map((item,index)=>{
        return (
        <div key={index}>
            <li>
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
        </div>
        )
    })
}

