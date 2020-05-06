import base from './base';
import axios from '../util/http';

/**
 * 城市模块接口列表
 */

const location = {    
    // 城市列表    
    location () {        
        return axios.get(`${base.api1}/getLocation`);    
    },
}

export default location;