import React from 'react';
import { Card, Input, Form, Select, DatePicker, Button, Table, Divider } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import moment from 'moment';
import Modals from './modals';
import URL from '../../../api/config';
import pagination from '../../pagination';// 翻页
import { parseParams } from '../../../axios/tools';// 翻页

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
// 搜索表单
const SearchForm = Form.create()(
    class extends React.Component {

        onSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    // console.log('Received values of form: ', values);
                }
            })
        }

        render() {

            const { getFieldDecorator } = this.props.form;

            const status = [
                { key: 1, value: '全部' },
                { key: 2, value: '2' },
                { key: 3, value: '3' }
            ];
            const timeSelect = [
                { key: 1, value: '借书时间' },
                { key: 2, value: '还书时间' },
                { key: 3, value: '创建时间' }
            ];
            const borrowWay = [
                { key: 1, value: '全部' },
                { key: 2, value: '快递' },
                { key: 3, value: '书柜' }
            ];

            return (
                <Form layout="inline" onSubmit={this.onSubmit} >
                    <FormItem label="状态：" >
                        {getFieldDecorator('status', { initialValue: status[0].value })(
                            <Select style={{ width: '150px' }}>
                                {
                                    status.map((i) => (
                                        <Option key={i.key} value={i.value}>{i.value}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('timeSelect', { initialValue: timeSelect[0].value })(
                            <Select style={{ width: '150px' }}>
                                {
                                    timeSelect.map((i) => (
                                        <Option key={i.key} value={i.value}>{i.value}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('timeRange', { initialValue: null })(
                            <RangePicker placeholder={['起始时间', '结束时间']} />
                        )}
                    </FormItem>
                    <FormItem label="借书方式：">
                        {getFieldDecorator('borrowWay', { initialValue: borrowWay[0].value })(
                            <Select style={{ width: '150px' }}>
                                {
                                    borrowWay.map((i) => (
                                        <Option key={i.key} value={i.value}>{i.value}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="快递编号：">
                        {getFieldDecorator('expressNum', { initialValue: null })(
                            <Input style={{ width: '200px' }} />
                        )}
                    </FormItem>
                    <FormItem style={{ float: 'right' }}>
                        <Button type="primary" htmlType="submit" >提交</Button>
                        <Button type="primary">导出</Button>
                    </FormItem>
                </Form >
            );
        }
    }
);
// 根据订单状态不同显示不同的action
class TableOption extends React.Component {

    state = {
        visible: false,
        optId: 0
    }

    handleOptClick = (type) => {
        console.log(type);
        this.setState({
            visible: true,
            optId: type
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    }

    render() {

        const { orderStatusId, orderId, deliverType } = this.props;
        const { visible, optId } = this.state;
        // action=[
        //     详情：1，
        //     发书柜：2，
        //     重新审核：3，
        //     关闭订单：4，
        //     修改金额：5，
        //     接单：6，
        //     上柜：7
        // ]
        const optType = [
            // 书柜1
            [
                null,
                // 待发货1
                [
                    { type: 1, name: '详情', next: true },
                    { type: 2, name: '发书柜', next: true },
                    { type: 4, name: '关闭订单' }
                ],
                // 待出库2
                [
                    { type: 1, name: '详情', next: true },
                    { type: 6, name: '接单', next: true },
                    { type: 4, name: '关闭订单' },
                ],
                // 配送中3
                [
                    { type: 1, name: '详情', next: true },
                    { type: 7, name: '上柜' }
                ],
                // 待收书4
                [
                    { type: 1, name: '详情' },
                ],
                // 待归还5
                [
                    { type: 1, name: '详情' },
                ],
                // 审核中6
                [
                    { type: 1, name: '详情' }
                ],
                // 审核通过7
                [
                    { type: 1, name: '详情' }
                ],
                // 审核未通过8
                [
                    { type: 1, name: '详情', next: true },
                    { type: 3, name: '重新审核' }
                ],
                // 逾期欠费9
                [
                    { type: 1, name: '详情', next: true },
                    { type: 5, name: '修改金额' }
                ]
            ],
            // 快递2
            [   // 待支付0
                [
                    { type: 1, name: '详情' }
                ],
                // 待发货1
                [
                    { type: 1, name: '详情', next: true },
                    { type: 2, name: '发快递' },
                ],
                null,
                null,
                null,
                // 待归还5
                [
                    { type: 1, name: '详情' },
                ],
                // 审核中6
                [
                    { type: 1, name: '详情' },
                ],
                // 审核通过7
                [
                    { type: 1, name: '详情' },
                ],
                // 审核未通过8
                [
                    { type: 1, name: '详情', next: true },
                    { type: 3, name: '重新审核' },
                ],
                // 逾期欠费9
                [
                    { type: 1, name: '详情', next: true },
                    { type: 5, name: '修改金额' }
                ]
            ],
        ];

        return (
            <div>
                {
                    optType[deliverType - 1][orderStatusId].map((i, index) => {
                        return (
                            <div key={index}>
                                <a href='javascript:;' onClick={() => this.handleOptClick(i.type)}>{i.name}</a>
                                {
                                    i.next ? <Divider type="vertical" /> : null
                                }
                            </div>
                        );
                    })
                }
                <Modals
                    visible={visible}
                    optId={optId}
                    orderId={orderId}
                    orderStatusId={orderStatusId}
                    deliverType={deliverType}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                />
            </div>
        );
    }
}

class BorrowO extends React.Component {

    state = {
        dataSource: []
    }

    componentDidMount() {
        this.requestList();
    }
    // 翻页
    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    requestList = () => {

        const orderStatus = [
            { type: 0, name: '待支付' },
            { type: 1, name: '待发货' },
            { type: 2, name: '待出库' },
            { type: 3, name: '配送中' },
            { type: 4, name: '待收书/已发货' },
            { type: 5, name: '待归还' },
            { type: 6, name: '审核中' },
            { type: 7, name: '审核通过' },
            { type: 8, name: '审核未通过' },
            { type: 9, name: '逾期欠费' },
            { type: 10, name: '已取消' },
        ];
        // 翻页
        let params = {
            start: this.params.currentPage - 1,
            size: this.params.pageSize,
        };

        // const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/borrowO'
        // 翻页
        fetch(`${URL}/order/curborrowrecords?${parseParams(params)}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                data.content.map((i) => {
                    i.key = i.borrowId;
                    i.orderId = i.orderNo;
                    i.VIPAccount = i.vipNo;
                    i.VIPName = i.nikeName;
                    i.bookName = i.bsBookinfo.bookName;
                    i.ISBN = i.bsBookinfo.isbn;
                    i.location = i.bsBookinstore.bsBookcaseinfo ? i.bsBookinstore.bsBookcellinfo.bsBookcaseinfo.caseId : null;
                    i.eLabel = i.bsBookinstore.rfid;
                    i.borWay = i.deliverType === 1 ? '书柜' : '快递'
                    i.borTime = moment(i.startTime).format('YYYY-MM-DD');
                    i.backWay = i.returnWay ? (i.returnWay === 1 ? '书柜' : '快递') : null;
                    i.backTime = i.finishTime ? moment(i.finishTime).format('YYYY-MM-DD') : null;
                    i.createTime = moment(i.createTime).format('YYYY-MM-DD');
                    i.orderStatus = { type: i.stage, name: orderStatus[i.stage].name };
                })
                // console.log(data.content);
                // data.data.map((i) => {
                //     i.key = i.orderId
                //     i.createTime = moment(i.createTime).format('YYYY-MM-DD');
                // });
                this.setState({
                    // 翻页
                    pagination: pagination(data, (current) => {//改变页码
                        this.params.currentPage = current;
                        this.requestList();
                    }, (size) => {//pageSize 变化的回调
                        this.params.pageSize = size;
                        this.requestList();
                    }),
                    dataSource: data.content
                });
            })
            .catch(err => console.log(err));
    }

    render() {

        const { dataSource } = this.state;

        const col = [
            { title: '订单编号', dataIndex: 'orderId' },
            { title: '会员账号', dataIndex: 'VIPAccount' },
            { title: '会员昵称', dataIndex: 'VIPName' },
            { title: '书籍名称', dataIndex: 'bookName' },
            { title: 'ISBN', dataIndex: 'ISBN' },
            { title: '货位', dataIndex: 'location' },
            { title: '电子标签', dataIndex: 'eLabel' },
            { title: '借书方式', dataIndex: 'borWay' },
            { title: '借书时间', dataIndex: 'borTime' },
            { title: '还书方式', dataIndex: 'backWay' },
            { title: '还书时间', dataIndex: 'backTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            { title: '订单状态', dataIndex: 'orderStatus.name' },
            {
                title: '操作', dataIndex: 'option',
                render: (text, record) => {
                    // console.log(record.orderStatus.type)
                    return (
                        // 还需传递订单编号
                        <div>
                            <TableOption deliverType={record.deliverType} orderStatusId={record.orderStatus.type} orderId={record.orderId} />
                        </div>
                    );
                }
            },
        ];

        return (
            <div>
                <BreadcrumbCustom first="订单管理" second="借阅订单" />
                <Card title="借阅订单">
                    <SearchForm />
                    <Table
                        className="borrowO-table"
                        bordered
                        columns={col}
                        dataSource={dataSource}
                        style={{ marginTop: '10px' }}
                        // 翻页
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}

export default BorrowO;
