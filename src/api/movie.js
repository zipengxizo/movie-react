import base from './base';
import axios from '../util/http';

/**
 * movie模块接口列表
 */

const movie = {    
    // 正在热映    
    movieOnList (arg) { 
        return axios.get(`${base.api1}/movieOnInfoList`,{
            params :{
                cityId : arg.cityId
            }
        });    
    },    
    // 即将上映    
    movieComingList (arg) {
        return axios.get(`${base.api1}/movieComingList`,{
            params :{
                cityId:arg.cityId
            }
        });    
    },        
    // 电影详情 
    movieDetail (arg) {        
        return axios.get(`${base.api1}/detailmovie`, { 
            params : {
                movieId : arg.movieId
            }           
        });    
    },
}

export default movie;