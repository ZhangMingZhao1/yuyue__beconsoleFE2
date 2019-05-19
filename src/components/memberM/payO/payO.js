import React from 'react';
import moment from 'moment';
import { Card, Select, DatePicker, Button, Form, Input, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import Url from '../../../api/config';
import pagination from '../../pagination';
import { getFormItem } from '../../baseFormItem';

//订单状态
const orderStatusConfig = {
    "0": "下单",
    "1": "支付成功",
    "-1": "订单取消",
    "-2": "过期已关闭"
}

//支付类型
const payTypeConfig = {
    "1": "wx",
    "2": "支付宝",
}

const OrderSearchForm = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            fieldsValue = { ...fieldsValue, payTime: fieldsValue['payTime'].map(i => moment(i).valueOf()) }
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const payTypeList = [];
            for (let i in payTypeConfig) {
                payTypeList.push({ "id": i, "name": payTypeConfig[i] });
            }
            const statusList = [];
            for (let i in orderStatusConfig) {
                statusList.push({ "id": i, "name": orderStatusConfig[i] });
            }
            const formList = [
                { type: 'SELECT', label: '类型', name: 'payType', width: '100px', list: payTypeList },
                { type: 'SELECT', label: '状态', name: 'status', width: '100px', list: statusList },
                { type: 'RANGPICKER', label: '时间', name: 'payTime', width: '300px' },
                { type: 'INPUT', placeholder: '昵称/账号/订单编号/流水号模糊查询', name: 'fuzzyQuery', width: '300px' },
            ];
            return (
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {getFormItem(form, formList)}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

class PayO extends React.Component {
    state = {}

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${Url}/vip/vipplanorders?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
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
                        key: i.orderNo,
                        orderNo: i.orderNo,
                        vipNo: i.vipNo,
                        nikeName: i.nikeName,
                        title: i.title,
                        payType: i.payType,
                        price: i.price,
                        payTime: moment(i.payTime).format("YYYY-MM-DD HH:mm:ss"),
                        createTime: moment(i.createTime).format("YYYY-MM-DD HH:mm:ss"),
                        tradeNo: i.tradeNo,
                        status: i.status,
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        const columns = [{
            title: '订单编号',
            dataIndex: 'orderNo',
        }, {
            title: '会员账号',
            dataIndex: 'vipNo',
        }, {
            title: '会员昵称',
            dataIndex: 'nikeName',
        }, {
            title: '购买服务名称',
            dataIndex: 'title',
        }, {
            title: '支付类型',
            dataIndex: 'payType',
        }, {
            title: '支付金额',
            dataIndex: 'price',
        }, {
            title: '支付时间',
            dataIndex: 'payTime',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
        }, {
            title: '流水号',
            dataIndex: 'tradeNo',
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (text) => orderStatusConfig[text]
        }];

        return (
            <div className="">
                <BreadcrumbCustom first="会员管理" second="订单支付" />
                <Card
                    title="支付订单"
                >
                    <OrderSearchForm /><br />
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
            </div>
        );
    }
}
export default PayO;