import React, { Component } from 'react';
import {Table, Card, Divider, Form, Select } from 'antd';
const { Option } = Select;
class FranInfo extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           
        }
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
          }, {
            title: '加盟商编号',
            dataIndex: 'franid',
            key: 'franid',
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
            dataIndex: 'contact',
          }, {
            title: '电话',
            key: 'phone',
            dataIndex: 'phone',
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
                <a href="javascript:;">查看</a>
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
                     <Form layout="inline">
                        <Form.Item key="department" label="所属部门">
                            {getFieldDecorator("department")(
                                <Select placeholder="" style={{ width: 120 }}>
                                    <Option key="1" value="1">1</Option>
                                    <Option key="2" value="2">2</Option>
                                    <Option key="3" value="3">3</Option>

                                </Select>
                            )}
                        </Form.Item>
                     </Form>
                    <Table dataSource={this.state.tableData} columns={columns} />
                </Card>
            </div>
        )
    }
}

export default FranInfo = Form.create({})(FranInfo)
