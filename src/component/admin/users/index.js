import React from "react";

import { Table, Tag, Space, Button, message, Popconfirm } from "antd";

import api from "../../../api";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },
      loading: false,
    };
    this.columns = [
      {
        title: "注册日期",
        dataIndex: "date",
        sorter: true,
        width: "20%",
        render: (date) => {
          return this.dateFormate("yyyy-MM-dd hh:mm:ss", new Date(date));
        },
      },
      {
        title: "用户姓名",
        dataIndex: "username",
        width: "20%",
      },
      {
        title: "用户邮箱",
        dataIndex: "email",
      },
      {
        title: "用户角色",
        dataIndex: "roles",
        render: (roles) => (
          <>
            {roles.map((role) => {
              let color = role.length > 2 ? "geekblue" : "green";
              if (role === "admin") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={role}>
                  {role.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record, index) => (
          <Space size="middle">
            <Button
              onClick={this.handleToFreeze.bind(this, index, record)}
              type="primary"
              size="small"
            >
              {record.isFreeze ? "已冻结" : "未冻结"}
            </Button>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => this.handleToDelete(index, record)}
            >
              <Button type="primary" size="small">
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }


  shouldComponentUpdate(nextProps,nextState){
    console.log(nextState.data)
    return true
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  dateFormate(fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }

  fetch = (params = {}) => {
    this.setState({ loading: true });
    api.users.usersList().then((res) => {
      let { status, data } = res.data;
      if (status === 0) {
        this.setState({
          loading: false,
          data: data.usersList,
          pagination: {
            ...params.pagination,
            total: 100,
          },
        });
      }
    });
  };

  handleToFreeze(index, row) {
    api.users
      .updateFreeze({
        email: row.email,
        isFreeze: !row.isFreeze,
      })
      .then((res) => {
        var status = res.data.status;
        if (status === 0) {
          message.loading("Action in progress..", 2.5).then(() => {
            const newData = [...this.state.data];
            newData[index].isFreeze = !row.isFreeze;
            /* const newData = this.state.data;
            newData[index].isFreeze = !row.isFreeze; */
            this.setState({
              data: newData,
            });
            message.success("冻结操作已成功");
          }, 2.5);
        } else {
          message.error("冻结操作失败");
        }
      });
  }
  handleToDelete(index, row) {
    api.users
      .deleteUser({
        email: row.email,
      })
      .then((res) => {
        var status = res.data.status;
        if (status === 0) {
          message.loading("Action in progress..", 2.5).then(() => {
            const newData = [...this.state.data];
            newData.splice(index, 1);
            this.setState({
              data: newData,
            });
            message.success("删除操作已成功");
          }, 2.5);
        } else {
          message.error("删除操作失败");
        }
      });
  }

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={this.columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
