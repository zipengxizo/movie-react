import base from './base';
import axios from '../util/http';

/**
 * cinema模块接口列表
 */

const cinema = {    
    // 影院列表    
    cinemaList (arg) {        
        return axios.get(`${base.api1}/cinemaList`,{
            params : {
                cityId : arg.cityId
            }
        });    
    }
}

export default cinema;