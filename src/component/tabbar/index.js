
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

export default class TabBar extends React.Component {
    render() {
      return (
        <footer id="footer">
            <ul>
                <li>
                    <Link to="/movie">
                        <i className="iconfont icon-dianying"></i>
                        <p>电影</p>
                    </Link>
                </li>
                <li>
                    <Link to="/cinema">
                        <i className="iconfont icon-yingyuan"></i>
                        <p>影院</p>
                    </Link>
                </li>
                <li>
                    <Link to="/mine">
                        <i className="iconfont icon-wode"></i>
                        <p>我的</p>
                    </Link>
                </li>
            </ul>
        </footer>
      );
    }
  }
