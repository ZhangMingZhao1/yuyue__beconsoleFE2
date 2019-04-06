import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import OrderDet from './orderDet';
import Url from '../../../api/config';
import pagination from '../../pagination';
import moment from 'moment';

const { Option } = Select;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

//捐书方式
const deliverTypeConfig = {
    "1": "书柜",
    "2": "快递"
}
//订单状态
const statusConfig = {
    "-1": "待入柜",
    "0": "待审核",
    "1": "污损",
    "2": "盗版",
    "9": "已完成"
}

const DonateOSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const stateSelect = ['全部', '1', '2'];
        const timeSelect = ['捐书时间', '创建时间'];
        return (
            <Form layout="inline">
                <Form.Item label='状态'>
                    {getFieldDecorator('state', { initialValue: stateSelect[0] })(
                        <Select style={{ width: 120 }}>
                            {stateSelect.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="">
                    {getFieldDecorator('time')(
                        <InputGroup compact>
                            <Select defaultValue={timeSelect[0]} style={{ width: 120 }}>
                                {timeSelect.map(i => (
                                    <Option key={i} value={i}>{i}</Option>
                                ))}
                            </Select>
                            <RangePicker />
                        </InputGroup>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery1')(
                        <Input placeholder="昵称/账号模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery2')(
                        <Input placeholder="书籍名称/ISBN模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class DonateO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
        }
    }
    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }
    componentDidMount() {
        this.requestList();
    }
    requestList = () => {
        fetch(`${Url}/curdonaterecords?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`)
            .then((res) => res.json()).then(result => {
                let data = result;
                this.setState({
                    pagination: pagination(data, (current) => {//改变页码
                        this.params.currentPage = current;
                        this.requestList();
                    }, (size) => {//pageSize 变化的回调
                        this.params.pageSize = size;
                        this.requestList();
                    }),
                    dataSource: data.content.map(i => ({
                        key: i.donateId,
                        donateId: i.donateId,
                        userId: i.bsUserinfo.userId,
                        nickname: i.bsUserinfo.nickname,
                        deliverType: i.deliverType,
                        donateTime: moment(i.donateTime).format("YYYY-MM-DD HH:mm:ss"),
                        createTime: moment(i.createTime).format("YYYY-MM-DD HH:mm:ss"),
                        status: i.status,
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }
    showModal(key) {
        this.setState({ [key]: true });
    }
    closeModal(key) {
        this.setState({ [key]: false });
    }

    render() {
        const columns = [
            { title: '订单编号', dataIndex: 'donateId' },
            { title: '会员账号', dataIndex: 'userId' },
            { title: '会员昵称', dataIndex: 'nickname' },
            { title: '书籍名称', dataIndex: 'bookName' },
            { title: '捐书方式', dataIndex: 'deliverType', render: (type) => deliverTypeConfig[type] },
            { title: '捐书时间', dataIndex: 'donateTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            { title: '订单状态', dataIndex: 'status', render: (status) => statusConfig[status] },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => <span><a onClick={() => { this.showModal('modal1') }}>详情</a></span>
            }];

        return (
            <div className="">
                <BreadcrumbCustom first="订单管理" second="捐书订单" />
                <Card
                    title="捐书订单"
                >
                    <DonateOSearchForm />
                    <div style={{ textAlign: 'right' }}><Button type='primary'>导出</Button></div><br />
                    <Table
                        className="donateO-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                    <OrderDet
                        visible={this.state.modal1}
                        onCancel={() => { this.closeModal('modal1') }}
                        donateWay='post'
                    />
                </Card>

            </div>
        )
    }
}

export default DonateO;