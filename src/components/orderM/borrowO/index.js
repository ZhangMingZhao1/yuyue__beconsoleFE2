import React from 'react';
import { Card, Input, Form, Select, DatePicker, Button, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';

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
                    console.log('Received values of form: ', values);
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

    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.orderStatusId}
            </div>
        );
    }

}

class BorrowO extends React.Component {

    render() {

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
            { title: '订单状态', dataIndex: 'orderStatus' },
            {
                title: '操作', dataIndex: 'option',
                render: (text, record) => (
                    <TableOption orderStatus={record.orderStatus} />
                )
            },
        ];

        const orderStatus = [
            { status: '待发货' },// 快递借书发货
            { status: '待发货' },// 书柜借书发货
            { status: '待出库' },// 书柜借书出库
            { status: '配送中' },// 书柜借书配送
            { status: '待收书' },// 书柜借书收书
            // 待完善
        ];

        const dataSource = [
            { orderId: 123, VIPAccount: 123, VIPName: 123, bookName: '《钢铁》', ISBN: '1231231231', location: 3, eLabel: '312312312312313', borWay: '快递', borTime: '2018-08-01', backWay: '快递', backTime: '2019-01-01', createTime: '2018-01-01', orderStatus: orderStatus[0] }
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
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                    />
                </Card>
            </div>
        );
    }
}

export default BorrowO;
