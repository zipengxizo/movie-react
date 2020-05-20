import React from 'react';
import Lazyload from 'r-img-lazyload';

const pic = require('../../assets/images/default.png')

export default class LazyImage extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const config = {
            option:{
                error:pic,
                loading:pic,
                listenEvents: [ 'scroll' ]
            },
            ...this.props
        }
        return <Lazyload {...config} />
    }
}