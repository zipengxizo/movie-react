
import React from 'react'
import TabBar from '../../component/tabbar'
import Header from '../../component/header'

export default class Cinema extends React.Component {
    
    render(){
        return (
            <div>
                <Header title="影院" />
                <TabBar />
            </div>
        )
    }
}