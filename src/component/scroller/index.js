import React from 'react'
import BScroll from 'better-scroll'

export default class Scroller extends React.Component {
    constructor(props){
        super(props);
        this.wrapperRef = React.createRef();
    }
    componentDidMount(){
        this.scroller = new BScroll(this.wrapperRef.current, {
            tap:true,
            probeType:1
        });
        this.scroller.on('scroll',(pos)=>{
            this.props.handleToScroll(pos);
        });
        this.scroller.on('touchEnd',(pos)=>{
            this.props.handleToTouchEnd(pos);
        });

    }
    componentWillUnmount(){
        this.scroller.destroy();
    }
    render(){
        return (
            <div className="wrapper" ref={this.wrapperRef}>
                {this.props.children}
            </div>
        )
    }
}   