import React from 'react'
import ReactDOM from 'react-dom'

const modelRoot = document.getElementById('modal-root');

export default class Netword extends React.Component {
    constructor(props){
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount(){
        modelRoot.appendChild(this.el);
    }
    componentWillUnmount(){
        modelRoot.removeChild(this.el);
    }
    render(){
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        )
    }

}