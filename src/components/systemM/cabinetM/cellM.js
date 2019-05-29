import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Form, Select, DatePicker, Input, Card, InputNumber, Button, Table } from 'antd';
import URL from '../../../api/config';
import pagination from '../../pagination';// 翻页
import { parseParams } from '../../../axios/tools';// 翻页

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SearchForm = Form.create()(
    class extends React.Component {

        onSubmit = (e) => {
            e.preventDefault();
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const selectData = [{
                label: "状态：",
                placeholder: "全部",
                name: "status",
                value: ['全部', '正常', '异常']
            }];
            return (
                <Form onSubmit={this.onSubmit} layout="inline">
                    {selectData.map(i => (
                        <Form.Item key={i.name} label={i.label}>
                            {getFieldDecorator(i.name)(
                                <Select placeholder={i.placeholder} style={{ width: 120 }}>
                                    {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                                </Select>
                            )}
                        </Form.Item>
                    ))}
                    <FormItem label="时间：">
                        <RangePicker />
                    </FormItem>
                    <FormItem>
                        <Input placeholder="名称/编号模糊查询" />
                    </FormItem>
                    <FormItem label="查询格子：">
                        <InputNumber defaultValue={1} style={{ width: 80, marginRight: 10 }} />
                        ~
                        <InputNumber defaultValue={1000} style={{ width: 80, marginLeft: 10 }} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </FormItem>
                </Form>
            );
        }
    }
);

class CellM extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.requestList();
    }
    // 翻页
    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }
    // TODO 后端缺少部分字段
    requestList = () => {
        // 翻页
        let params = {
            start: this.params.currentPage - 1,
            size: this.params.pageSize,
        };
        // 翻页
        fetch(`${URL}/system/bookcellinfos/${this.props.match.params.id}?${parseParams(params)}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    // 翻页
                    pagination: pagination(data, (current) => {//改变页码
                        this.params.currentPage = current;
                        this.requestList();
                    }, (size) => {//pageSize 变化的回调
                        this.params.pageSize = size;
                        this.requestList();
                    }),
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const columns = [{
            dataIndex: 'icon'
        }, {
            title: '格子编号',
            dataIndex: 'cellId'
        }, {
            title: '书籍名称',
            dataIndex: 'bookName'
        }, {
            title: '书籍编号',
            dataIndex: 'bookId'
        }, {
            title: '订单编号',
            dataIndex: 'orderId'
        }, {
            title: '上柜时间',
            dataIndex: 'toCaseTime'
        }, {
            title: '状态',
            dataIndex: 'status'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => {

            }
        }]

        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="机柜管理" />
                <Card title="格子管理">
                    <SearchForm />
                    <Table className="infoC-table"
                        columns={columns}
                        // dataSource={data}
                        // 翻页
                        pagination={this.state.pagination}
                        style={{ marginTop: 10 }}
                        bordered
                    />
                </Card>
            </React.Fragment>
        );
    }
}

export default CellM;
