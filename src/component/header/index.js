

import React from 'react'

export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <header id="header">
               {this.props.children}<h1>{this.props.title}</h1>
            </header>
        )
    }
}