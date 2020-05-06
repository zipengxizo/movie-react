import base from './base';
import axios from '../util/http';


const users = {
    login(params) {
        return axios.post(`${base.api2}/users/login`,params)
    },
    register(params) {
        return axios.post(`${base.api2}/users/register`,params)
    },
    usersList() {
        return axios.get(`${base.api2}/admin/usersList`);
    },
    deleteUser(params) {
        return axios.post(`${base.api2}/admin/deleteUser`,{
            params : params
        })
    },
    updateFreeze(params) {
        return axios.post(`${base.api2}/admin/updateFreeze`,params)
        
    },
    verifyImg() {
        return `${base.api2}/users/verifyImg`
    },
    getUser() {
        return axios.get(`${base.api2}/users/getUser`)
    },
    uploadUserHead(params,config) {

        return axios.post(`${base.api2}/users/uploadUserHead`,params,config)
        
    },
    logout() {
        return axios.get(`${base.api2}/users/logout`)
        
    },
    isAdmin(params) {
        return axios.post(`${base.api2}/admin`,params)
    },
    verify(params) {
        return axios.get(`${base.api2}/users/verify`,params)
    }

}

export default users;