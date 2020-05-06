import base from './base';
import axios from 'axios';



const rearch = {
    rearchList(cityId,message){
        axios.get(`${base}searchList`,{
            cityId : cityId,
            message : message
        })
    }
}


export default rearch;