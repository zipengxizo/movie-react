import React from 'react'
import Loadable from 'react-loadable'
import {Loading} from '@/component/loading'
export default (loader)=>{
    return Loadable({
        loader,
        loading() {
            return <Loading isLoading />
        }
    })
}