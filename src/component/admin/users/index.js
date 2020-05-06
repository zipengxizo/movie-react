import React from 'react'

import { Table } from 'antd';

import api from '../../../api'
const columns = [
  {
    title: '注册日期',
    dataIndex: 'date',
    sorter: true,
    width: '20%',
  },
  {
    title: '用户姓名',
    dataIndex: 'username',
    width: '20%',
  },
  {
    title: '用户邮箱',
    dataIndex: 'email',
  },
  {
    title: '用户角色',
    dataIndex: 'roles',
  }
];
export default class Users extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

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

  fetch = (params = {}) => {
    this.setState({ loading: true });
    api.users.usersList().then((res)=>{
        let {status,data} = res.data;
        if(status === 0){
            this.setState({
                loading : false,
                data: data.usersList,
                pagination:{
                    ...params.pagination,
                    total:100
                }
            })
        }
     });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={columns}
        rowKey={record => record._id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}