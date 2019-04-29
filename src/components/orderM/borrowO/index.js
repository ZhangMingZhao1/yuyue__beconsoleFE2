import React from 'react';
import { Card, Input, Form, Select, DatePicker, Button, Table, Divider } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import moment from 'moment';

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
        // 后端有数据后还需要传递订单编号
        // 路由到别的界面
        const id = this.props.orderStatusId

        switch (id) {
            case 1:
                return <div>
                    <a href='javascript:;'>详情</a>
                    <Divider type="vertical" />
                    <a href='javascript:;'>发快递</a>
                </div>
            case 2:
                return <div>
                    <a herf='javascipt:;'>详情</a>
                    <Divider type="vertical" />
                    <a href='javascript:;'>发书柜</a>
                    <Divider type="vertical" />
                    <a href='javascript:;'>关闭订单</a>
                </div>
            case 3:
                return <div>
                    <a herf='javascipt:;'>详情</a>
                    <Divider type="vertical" />
                    <a herf='javascipt:;'>接单</a>
                    <Divider type="vertical" />
                    <a herf='javascipt:;'>关闭订单</a>
                </div>
            case 4:
                return <div>
                    <a href='javascript:;'>详情</a>
                    <Divider type="vertical" />
                    <a href='javascript:;'>上柜</a>
                </div>
            case 5:
                return <div>
                    <a href='javascript:;'>详情</a>
                    <Divider type="vertical" />
                    <a href='javascript:;'>关闭订单</a>
                </div>
            case 6:
                return <div>
                    <a href='javascript:;'>详情</a>
                    <Divider type="vertical" />
                    <a href='javascript:;'>关闭订单</a>
                </div>
            case 7:
                return <div>
                    <a href='javascript:;'>详情</a>
                </div>
            case 8:
                return <div>
                    <a href='javascript:;'>详情</a>
                </div>
            case 9:
                return <div>
                    <a href='javascript:;'>详情</a>
                    <Divider type="vertical" />
                    <a href='javascript:;'>重新审核</a>
                </div>
            default:
                return null;
        }
    }
}

class BorrowO extends React.Component {

    state = {
        dataSource: []
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/borrowO'
        fetch(url, {
            method: 'GET',
            // credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                data.data.map((i, index) => {
                    i.key = index// 后端有数据后改为订单编号
                    i.createTime = moment(i.createTime).format('YYYY-MM-DD');
                });
                this.setState({
                    dataSource: data.data
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
            { title: '订单状态', dataIndex: 'orderStatus.status' },
            {
                title: '操作', dataIndex: 'option',
                render: (text, record) => (
                    // 还需传递订单编号
                    <TableOption orderStatusId={record.orderStatus.id} />
                )
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
