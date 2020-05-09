import React from 'react'

export default class AdminMovie extends React.Component {
    /* constructor(props){
        super(props);
    } */
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps,nextState);
    }
    render(){
        console.log(111)
        return <div>movies list of cityId {this.props.cityId}</div>
    }
}