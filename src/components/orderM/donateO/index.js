import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, message } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import OrderDet from './orderDet';
import Url from '../../../api/config';
import pagination from '../../pagination';
import moment from 'moment';
import { getOptionList, getFormItem } from '../../baseFormItem';
import { parseParams } from '../../../axios/tools';


//捐书方式
const deliverTypeConfig = {
    "1": "书柜",
    "2": "快递"
}
//订单状态
const statusConfig = {
    "": "全部",
    "-1": "待入柜",
    "0": "待审核",
    "1": "污损",
    "2": "盗版",
    "9": "已完成"
}

//条件查询Form
const DonateOSearchForm = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let form = this.props.form;
            form.validateFields((err, values) => {
                if (!err) {
                    console.log(values)
                    let time = values.time;
                    let starttime = time && time.timeRange && time.timeRange[0] && time.timeRange[0].valueOf();
                    let endtime = time && time.timeRange && time.timeRange[0] && time.timeRange[1].valueOf();
                    let data = {
                        ...values,
                        starttime: starttime || '',
                        endtime: endtime || '',
                        keyword1: values.keyword1 || '',
                        keyword2: values.keyword2 || '',
                    };
                    delete data.time;
                    this.props.onSubmit(data);
                }
            })
        }
        render() {
            const { form } = this.props;
            const statusList = [];
            for (let val in statusConfig) {
                statusList.push({ id: val, name: statusConfig[val] })
            }
            const formList = [
                { type: 'SELECT', label: '状态', name: 'status', width: '100px', list: statusList },
                { type: 'OTHER', label: '', name: 'time', component: <TimeGroupInput /> },
                { type: 'INPUT', label: '', name: 'keyword1', placeholder: "昵称/账号模糊查询" },
                { type: 'INPUT', label: '', name: 'keyword2', placeholder: "书籍名称/ISBN模糊查询" },
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

class DonateO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,//详情弹框
            donateWay: {},//详情弹框 捐书方式
            detailData: {},//详情弹框 订单数据
        }
    }

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
        /**搜索参数 */
        search: {},
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        let params = {
            start: this.params.currentPage - 1,
            size: this.params.pageSize,
            ...this.params.search,
        };
        fetch(`${Url}/order/curdonaterecords?${parseParams(params)}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                // if (result.code === 0) {
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
                        ...i,
                        key: i.donateId,
                        donateTime: moment(i.donateTime).format("YYYY-MM-DD HH:mm:ss"),
                        // createTime: moment(i.createTime).format("YYYY-MM-DD HH:mm:ss"),
                    }))
                })
                // } else {
                //     message.error(result.message)
                // }
            }).catch((err) => {
                console.log(err);
            })
    }

    /**
     * 条件查询
     */
    handleSearch = (data) => {
        this.params.search = data;
        this.requestList();
    }

    /**
     * 订单详情
     */
    handleDet = (key) => {
        fetch(`${Url}/order/donaterecords/${key}`, { credentials: 'include' })
            .then((res) => res.json()).then(data => {
                this.setState({
                    detailData: {
                        ...data,
                        deliverType: deliverTypeConfig[data.deliverType],
                        status: statusConfig[data.status],
                        donateTime: moment(data.donateTime).format("YYYY-MM-DD HH:mm:ss"),
                        // createTime: moment(i.createTime).format("YYYY-MM-DD HH:mm:ss"),
                    },
                    donateWay: data.deliverType === "1" ? "case" : "post",
                    modal: true
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        const columns = [
            { title: '订单编号', dataIndex: 'orderNo' },
            { title: '会员账号', dataIndex: 'vipNo' },
            { title: '会员昵称', dataIndex: 'nikeName' },
            { title: '书籍名称', dataIndex: 'bookName' },
            { title: 'ISBN', dataIndex: 'isbn' },
            { title: '捐书方式', dataIndex: 'deliverType', render: (type) => deliverTypeConfig[type] },
            { title: '捐书时间', dataIndex: 'donateTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            { title: '订单状态', dataIndex: 'status', render: (status) => statusConfig[status] },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => <span><a onClick={() => { this.handleDet(record.orderNo) }}>详情</a></span>
            }];

        return (
            <div className="">
                <BreadcrumbCustom first="订单管理" second="捐书订单" />
                <Card
                    title="捐书订单"
                >
                    <DonateOSearchForm onSubmit={this.handleSearch} />
                    <div style={{ textAlign: 'right' }}><Button type='primary'>导出</Button></div><br />
                    <Table
                        className="donateO-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                    <OrderDet
                        visible={this.state.modal}
                        onCancel={() => { this.setState({ modal: false }) }}
                        donateWay={this.state.donateWay}
                        data={this.state.detailData}
                    />
                </Card>

            </div>
        )
    }
}

export default DonateO;

const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

//时间组合输入框 in 条件查询Form
class TimeGroupInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            timeType: value.timeType,
            timeRange: value.timeRange,
        };
    }
    handleSelectChange = (v) => {
        if (!('value' in this.props)) {
            this.setState({ timeType: v });
        }
        this.triggerChange({ timeType: v });
    }
    handleDateChange = (timeRange) => {
        if (!('value' in this.props)) {
            this.setState({ timeRange });
        }
        this.triggerChange({ timeRange });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    render() {
        const timeTypeList = [{ id: "捐书时间", name: "捐书时间" }, { id: "创建时间", name: "创建时间" }];
        return (
            <InputGroup compact>
                <Select
                    value={this.state.timeType}
                    onChange={this.handleSelectChange}
                    style={{ width: "100px" }}
                >
                    {getOptionList(timeTypeList)}
                </Select>
                <RangePicker
                    value={this.state.timeRange}
                    onChange={this.handleDateChange}
                />
            </InputGroup>
        );
    }
}