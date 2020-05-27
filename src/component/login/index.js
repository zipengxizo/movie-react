import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import api from "@/api";
import { messageBox } from "../alert";
import { Auth } from "@/auth";

import "./index.css";
import { Loading } from "../loading";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      verifyImg: "",
      isLoading: false,
    };
    this.handleToVerifyImg = this.handleToVerifyImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeIsLoading = this.changeIsLoading.bind(this);

    this.img = React.createRef();
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  changeIsLoading(bol){
    this.setState({
      isLoading : bol
    })
  }

  handleToVerifyImg(event) {
    event.target.src = api.users.verifyImg() + "?" + Math.random();
  }

  render() {
    return (
      <div className="login_body">
        <div>
          <input
            value={this.state.username}
            name="username"
            className="login_text"
            type="text"
            placeholder="账户名/手机号/Email"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            value={this.state.password}
            name="password"
            className="login_text"
            type="password"
            placeholder="请输入您的密码"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="login_text"
            name="verifyImg"
            value={this.state.verifyImg}
            placeholder="请输入您的验证码"
            onChange={this.handleChange}
          />
          <img
            onClick={this.handleToVerifyImg}
            src={api.users.verifyImg()}
            alt=""
            ref={this.img}
          />
        </div>
        <div className="login_btn">
          <LoginButton users={this.state} imgRef={this.img} changeIsLoading={this.changeIsLoading} />
        </div>
        <div className="login_link">
          <Link to="/mine/register">立即注册</Link>
          <Link to="/mine/findPassword">找回密码</Link>
        </div>
        <Loading isLoading={this.state.isLoading} />
      </div>
    );
  }
}

function LoginButton(props) {
  const users = props.users;
  const imgRef = props.imgRef;
  let history = useHistory();
  let location = useLocation();
  function handleToLogin() {
    props.changeIsLoading(true)
    let { from } = location.state || { from: { pathname: "/admin" } };
    api.users
      .login({
        username: users.username,
        password: users.password,
        verifyImg: users.verifyImg,
      })
      .then((res) => {
        var status = res.data.status;
        props.changeIsLoading(false);
        if (status === 0) {
          //设置token
          let { token, username } = res.data.data;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("username", username);
          // this.$store.commit("token/TOKEN", { token });
          messageBox({
            title: "登录",
            content: "登录成功",
            ok: "确定",
            handleOk() {
              if (from) {
                Auth.authenticate(() => {
                  history.replace(from);
                });
              } else {
                Auth.authenticate(() => {
                  history.replace("/mine/center");
                });
              }
            },
          });
        } else {
          messageBox({
            title: "登录",
            content: res.data.msg,
            ok: "确定",
          });
          imgRef.current.src = api.users.verifyImg() + "?" + Math.random();
        }
      });
  }

  return <input type="submit" value="登录" onClick={handleToLogin} />;
}
