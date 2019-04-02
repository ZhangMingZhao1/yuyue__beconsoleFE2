import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Card, Select, DatePicker, Input, Table, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import URL from '../../../api/config';

const { Option } = Select;
const { RangePicker } = DatePicker;

class InvitationCode extends React.Component {

    state = {
        listInv: [],
        stateSelectValue: '',
        dateRange: ['', ''],
        inputValue: '',
    }

    componentDidMount() {

    }

    requestList = () => {
        // fetch(`${URL}/`)
    }

    stateSelectChange = (value) => {
        this.setState({
            stateSelectValue: value
        });
    }

    rangePickerChange = (value, dateString) => {
        this.setState({
            dateRange: dateString
        });
    }

    inputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    searchBtnClick = () => {

    }

    render() {

        const { listInv, inputValue } = this.state;

        const columns = [{
            title: '大客户编号',
            dataIndex: 'customerId'
        }, {
            title: '名称',
            dataIndex: 'customerName'
        }, {
            title: '邀请码',
            dataIndex: 'invCDKey'
        }, {
            title: '有效开始时间',
            dataIndex: 'startTime'
        }, {
            title: '有效结束时间',
            dataIndex: 'endTime'
        }, {
            title: '有效人数',
            dataIndex: 'effNum'
        }, {
            title: '邀请码状态',
            dataIndex: 'state'
        }, {
            title: '创建时间',
            dataIndex: 'createTime'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                record.state === '禁用'
                    ?
                    <div>
                        <a href="javascript:;">修改</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">删除</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">启用</a>
                    </div>
                    :
                    <div>
                        <a href="javascript:;">禁用</a>
                    </div>
            )
        }]

        return (
            <React.Fragment>
                <BreadcrumbCustom first="会员管理" second="邀请码" />
                <Card title="邀请码">
                    <span style={{ marginTop: '10px', marginLeft: '10px' }}>
                        状态：
                        <Select defaultValue="全部" style={{ width: '100px' }} onChange={this.stateSelectChange}>
                            <Option value="禁用">禁用</Option>
                            <Option value="启用">启用</Option>
                        </Select>
                    </span>
                    <span style={{ marginTop: '10px', marginLeft: '10px' }}>
                        时间：
                        <RangePicker
                            placeholder={['起始时间', '结束时间']}
                            onChange={this.rangePickerChange}
                        />
                    </span>
                    <Input
                        placeholder="大客户名称/邀请码模糊查询"
                        value={inputValue}
                        onChange={this.inputChange}
                        style={{ marginTop: '10px', marginLeft: '10px', width: '300px' }}
                    />
                    <Button
                        type="primary"
                        style={{ marginTop: '10px', marginLeft: '10px' }}
                        onClick={this.searchBtnClick}
                    >
                        查询
                    </Button>
                    <br />
                    <Button
                        type="primary"
                        style={{ marginTop: '10px' }}
                    >
                        <Link to={'./invitationCode/addInvCode'}>新增</Link>
                    </Button>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={listInv}
                        style={{ marginTop: '10px' }}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                    />
                </Card>
            </React.Fragment>
        );
    }
}

export default InvitationCode;
