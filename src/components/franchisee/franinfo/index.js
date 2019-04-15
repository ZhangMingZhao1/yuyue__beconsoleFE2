import React, { Component } from 'react';
import {Table, Card, Divider, Form, Select, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import URL from '../../../api/config';
const { Option } = Select;

class FranInfo extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           tableData:[],
        }
      }
    fetchFranInfoData=()=> {
      fetch('http://localhost:8080/yuyue/franinfo',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then((res)=>res.json())
      .then((data)=>{
          if(data) {
              console.log('1111112222'+data);
              this.setState({tableData:data});
          }
      })
    }
    componentDidMount() {
      this.fetchFranInfoData();
    }
    handleSubmit = (e)=>{
      e.preventDefault();
      let formData = this.props.form.getFieldsValue();
      console.log('加盟商',formData);
      // let options = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
      //   body: JSON.stringify({
      //     username:formData.r_userName,
      //     password:formData.r_password
      //   })
      // };
      // fetch("")
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
          }, {
            title: '加盟商编号',
            dataIndex: 'fran_id',
            key: 'fran_id',
          }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '类型',
            key: 'type',
            dataIndex: 'type',
          }, 
          {
            title: '等级',
            key: 'rank',
            dataIndex: 'rank',
          }, {
            title: '联系人',
            key: 'contact',
            dataIndex: 'contact_name',
          }, {
            title: '电话',
            key: 'phone',
            dataIndex: 'contact_phone',
          },
          {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <Link to={`${this.props.match.url}/franinfodetail/${record.id}`}>查看</Link>
                <Divider type="vertical" />
                <a href="javascript:;">修改</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
              </span>
            ),
          }];
        return (
            <div>
                <Card>
                     <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item key="department" label="所属部门">
                            {getFieldDecorator("department")(
                                <Select placeholder="" style={{ width: 120 }}>
                                    <Option key="1" value="1">1</Option>
                                    <Option key="2" value="2">2</Option>
                                    <Option key="3" value="3">3</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item key="input" label="">
                            {getFieldDecorator("input")(
                               <Input style={{ width: 300 }} placeholder="昵称，编号，姓名，电话模糊查询" />
                            )}
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                     </Form>
                     <Button type="primary" style={{marginTop:10,marginBottom:10}} onClick={this.addFran}>新建</Button>
                    <Table dataSource={this.state.tableData} columns={columns} />
                </Card>
            </div>
        )
    }
}

export default FranInfo = Form.create({})(FranInfo)
