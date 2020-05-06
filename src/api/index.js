/** 
 * api接口的统一出口
 */
// 影院模块接口
import cinema from './cinema';
//电影模块接口
import movie from './movie';
//城市模块接口
import city from './city';
//搜索模块接口
import search from './search';
//城市定位接口
import location from './location';
//admin后台接口
import users from './users';


// 导出接口
export default {    
    cinema,
    movie,
    city,
    search,
    location,
    users
}