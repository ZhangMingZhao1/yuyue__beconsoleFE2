import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import Url from '../../../api/config';
import pagination from '../../pagination';
import moment from 'moment';

const { Option } = Select;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

//借书/还书方式
const deliverTypeConfig = {
    "1": "书柜",
    "2": "快递"
}

const DonateOSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const stateSelect = ['全部', '1', '2'];
        const timeSelect = ['借书时间', '还书时间', '创建时间'];
        const borrowWay = ['全部',];
        const returnWay = ['全部',];
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
                <Form.Item label='借书方式'>
                    {getFieldDecorator('borrowWay')(
                        <Select style={{ width: 120 }}>
                            {borrowWay.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='还书方式'>
                    {getFieldDecorator('returnWay')(
                        <Select style={{ width: 120 }}>
                            {returnWay.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
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

class BorrowH extends React.Component {
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
        fetch(`${Url}/order/hisborrowrecords?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
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
                        key: i.borrowId,
                        borrowId: i.borrowId,
                        userId: i.bsUserinfo.userId,
                        nickname: i.bsUserinfo.nickname,
                        bookName: i.bsBookinfo.bookName,
                        isbn: i.bsBookinfo.isbn,
                        rfid: i.bsBookinstore.rfid,
                        deliverType: i.deliverType,
                        returnWay: i.returnWay,
                        finishTime: moment(i.finishTime).format("YYYY-MM-DD HH:mm:ss"),
                        createTime: moment(i.createTime).format("YYYY-MM-DD HH:mm:ss")
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
            { title: '订单编号', dataIndex: 'borrowId' },
            { title: '会员账号', dataIndex: 'userId' },
            { title: '会员昵称', dataIndex: 'nickname' },
            { title: '书籍名称', dataIndex: 'bookName' },
            { title: 'ISBN', dataIndex: 'isbn' },
            { title: '电子标签', dataIndex: 'rfid' },
            { title: '借书方式', dataIndex: 'deliverType', render: (type) => deliverTypeConfig[type] },
            { title: '借书时间', dataIndex: 'borrowTime' },
            { title: '还书方式', dataIndex: 'returnWay', render: (type) => deliverTypeConfig[type] },
            { title: '还书时间', dataIndex: 'finishTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => <span><a>详情</a></span>
            }];

        return (
            <div className="">
                <BreadcrumbCustom first="订单管理" second="历史借阅" />
                <Card
                    title="历史借阅"
                >
                    <DonateOSearchForm />
                    <div style={{ textAlign: 'right' }}><Button type='primary'>导出</Button></div><br />
                    <Table
                        className="borrowH-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
            </div>
        )
    }
}

export default BorrowH;