import React from "react";
import { Form, Button, Card, Table, Divider, Modal, message } from "antd";
// import "./index.less";
import BreadcrumbCustom from "../../BreadcrumbCustom";
import Url from "../../../api/config";

class LogOperation extends React.Component {
  state = {
    tableData:[],
  };

  componentDidMount() {
    this.requestList();
  }
  requestList =()=>{
      fetch(`${Url}/system/operationlog`,{"credentials":"include"})
        .then(res=>res.json())
        .then(data=>{
            this.setState({tableData:data.content})
        })
  }

  render() {
    const columns = [
        {
          title: '序号',
          dataIndex: 'logId',
          key: 'log_id',
        },
        {
          title: '增删改查',
          dataIndex: 'crud',
          key: 'crud',
        },
        {
          title: '操作员id',
          dataIndex: 'operationId',
          key: 'operation_id',
        },
        {
            title: '操作功能',
            dataIndex: 'features',
            key: 'features',
          },
          {
            title: '功能id',
            dataIndex: 'featuresId',
            key: 'features_id',
          },
          {
            title: '操作时间',
            dataIndex: 'operationTime',
            key: 'operation_time',
          },
          {
            title: '操作备注',
            dataIndex: 'remarks',
            key: 'remarks',
          },
      ];
    return (
        <Card>
            操作日志
            <Divider/>
            <Table
                 dataSource={this.state.tableData} 
                 columns={columns}   
            />
        </Card>
    )
    }
  
}

export default LogOperation;
