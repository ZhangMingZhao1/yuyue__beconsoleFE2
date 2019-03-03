import React from 'react';
import { Card, Button, Input, Select, Form, Table, Divider, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';

const Option = Select.Option;
const confirm = Modal.confirm;
const StaffSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            label: "所属机构",
            placeholder: "全部",
            name: "category",
            value: ['全部', '朝阳街道']
        }, {
            label: "所属部门",
            placeholder: "全部",
            name: "isSelected",
            value: ['全部', '技术部', '运维部'],
        }, {
            label: "状态",
            placeholder: "全部",
            name: "publisher",
            value: ['全部', '正常', '停用']
        }];
        return (
            <Form layout="inline">
                <Form.Item>
                    <label>姓名：</label>
                    <Input placeholder="姓名" style={{ width: 120 }} />
                </Form.Item>
                {selectData.map(i => (
                    <Form.Item key={i.name} label={i.label}>
                        {getFieldDecorator(i.name)(
                            <Select placeholder={i.placeholder} style={{ width: 120 }}>
                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                            </Select>
                        )}
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class StaffM extends React.Component {

    showConfirm = () => {
        confirm({
            title: 'Want to delete these items?',
            content: 'some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    render() {

        const columns = [{
            title: '员工ID',
            dataIndex: 'ID',
        }, {
            title: '员工姓名',
            dataIndex: 'name',
        }, {
            title: '手机号',
            dataIndex: 'phoneNumber',
        }, {
            title: '所属机构',
            dataIndex: 'org',
        }, {
            title: '所属部门',
            dataIndex: 'department',
        }, {
            title: '角色',
            dataIndex: 'character',
        }, {
            title: '状态',
            dataIndex: 'status',
        }, {
            title: '备注',
            dataIndex: 'remark',
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={this.showConfirm}>重置密码</a>
                    <Divider type="vertical" />
                    <Link to={`${this.props.match.url}/changeStaff/${record.name}`}>修改</Link>
                    <Divider type="vertical" />
                    <a href="javascript:;">删除</a>
                </span>
            ),
        }];

        const data = [{
            ID: 1,
            name: '毛大虎',
            phoneNumber: '13102020202',
            org: '朝阳街道',
            department: '技术部',
            character: '系统管理员',
            status: '正常',
            remark: ''
        }, {
            ID: 2,
            name: '毛大虎',
            phoneNumber: '13102020202',
            org: '朝阳街道',
            department: '技术部',
            character: '系统管理员',
            status: '正常',
            remark: ''
        }];

        data.map(i => i.key = i.ID);

        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="员工管理" />
                <Card
                    title="书目库"
                >
                    <StaffSearchForm /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary"><Link to={`${this.props.match.url}/addStaff`}>新增</Link></Button>
                    </div>
                    <Table className="infoC-table"
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                        bordered
                    />
                </Card>
            </React.Fragment>
        );
    };
}

export default StaffM;
