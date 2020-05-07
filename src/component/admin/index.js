import React, { Suspense } from "react";
import { Layout, Menu, Button } from "antd";
import "./index.css";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import history from '../../util/history'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Users from "./users";

const { Header, Sider, Content } = Layout;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  loginOut(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    history.push('/login')
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/admin/users" className='navlink'>用户管理</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<UploadOutlined />}>
              <NavLink to="/admin/movie" className="navlink">电影管理</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <NavLink to="/admin/cinema" className="navlink">影院管理</NavLink>
            </Menu.Item>
            <Menu.Item key="11" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="21" icon={<UploadOutlined />}>
              电影管理
            </Menu.Item>
            <Menu.Item key="31" icon={<VideoCameraOutlined />}>
              影院管理
            </Menu.Item>
            <Menu.Item key="111" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="222" icon={<UploadOutlined />}>
              电影管理
            </Menu.Item>
            <Menu.Item key="333" icon={<VideoCameraOutlined />}>
              影院管理
            </Menu.Item>
            <Menu.Item key="1a" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="2a" icon={<UploadOutlined />}>
              电影管理
            </Menu.Item>
            <Menu.Item key="3a" icon={<VideoCameraOutlined />}>
              影院管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
            <Button type="link" onClick={()=>this.loginOut()} style={{float:'right',margin:'16px 16px 0 0'}}>退出</Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Suspense>
              <Switch>
                <Route path="/admin/users">
                    <Users />
                </Route>
                <Route path="/admin/movie">
                  <div>movie</div>
                </Route>
                <Route path="/admin/cinema">
                  <div>cinema</div>
                </Route>
                <Route path="/">
                  <Redirect to="/admin/users" />
                </Route>
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
