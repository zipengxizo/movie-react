import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const modalRoot = document.getElementById('modal-root');
let div = document.createElement("div");

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel1 = this.handleCancel1.bind(this);
    this.handleOk1 = this.handleOk1.bind(this);
    this.state = {
      isShow: true,
    };
  }
  handleCancel1() {
    this.props.handleCancel && this.props.handleCancel();
    modalRoot.removeChild(div);
    /* this.setState({
      isShow : false
    }) */
  }
  handleOk1() {
    this.props.handleOk && this.props.handleOk();
    modalRoot.removeChild(div);
    /* this.setState({
      isShow: false
    }) */
  }
  render() {
    let cancel, ok;
    if (this.props.cancel) {
      cancel = <div onClick={this.handleCancel1}>{this.props.cancel}</div>;
    }
    if (this.props.ok) {
      ok = <div onClick={this.handleOk1}>{this.props.ok}</div>;
    }

    return (
      <div className="messageBox">
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
        <div>
          {cancel}
          {ok}
        </div>
      </div>
    )
  }
}

export const messageBox = function (options) {

  let defaults = {
    //默认值
    title: "标题",
    content: "内容",
    cancel: "取消",
    ok: "确定",
    handleCancel: null,
    handleOk: null,
  };

  Object.assign(defaults, options);

  // document.body.appendChild(div);
  modalRoot.appendChild(div)

  ReactDOM.render(React.createElement(Alert, defaults), div);
};
