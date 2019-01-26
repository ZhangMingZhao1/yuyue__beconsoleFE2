import React from 'react';
import { Card, Select, DatePicker, Button, Form, Input, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            label: "类型",
            placeholder: "全部",
            name: "type",
            value: ['1', '2']
        }, {
            label: "状态",
            placeholder: "全部",
            name: "state",
            value: ['1', '2']
        }];
        return (
            <Form layout="inline">
                {selectData.map(i => (
                    <Form.Item key={i.name} label={i.label}>
                        {getFieldDecorator(i.name)(
                            <Select placeholder={i.placeholder} style={{ width: 120 }}>
                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                            </Select>
                        )}
                    </Form.Item>
                ))}
                <Form.Item label="时间">
                    {getFieldDecorator('time')(
                        <RangePicker />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery')(
                        <Input style={{ width: 250 }} placeholder="昵称/账号/订单编号/流水号模糊查询" />
                    )}
                </Form.Item>
                <div style={{ textAlign: 'right' }}><Button type="primary" htmlType="submit">查询</Button></div>
            </Form>
        );
    }
);

class PayO extends React.Component {

    render() {
        const columns = [{
            title: '订单编号',
            dataIndex: 'orderID',
        }, {
            title: '会员账号',
            dataIndex: 'account',
        }, {
            title: '会员昵称',
            dataIndex: 'nickName',
        }, {
            title: '购买服务名称',
            dataIndex: 'service',
        }, {
            title: '支付类型',
            dataIndex: 'payType',
        }, {
            title: '支付金额',
            dataIndex: 'payMoney',
        }, {
            title: '支付时间',
            dataIndex: 'payTime',
        }, {
            title: '流水号',
            dataIndex: 'serialNum',
        }, {
            title: '状态',
            dataIndex: 'state',
        }];

        const data = [];
        return (
            <div className="">
                <BreadcrumbCustom first="会员管理" second="订单支付" />
                <Card
                    title="支付订单"
                >
                    <OrderSearchForm /><br/>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            showTotal:(total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10','20','50']
                        }}
                        bordered
                    />
                </Card>
            </div>
        );
    }
}
export default PayO;