import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, Divider, Pagination, Modal, Radio } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import moment from 'moment';
import OrderDet from './orderDet';
import DeliveryModal from './deliveryModal';
import Url from '../../../api/config';
import pagination from '../../pagination';

const { Option } = Select;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;

//借书方式
const deliverTypeConfig = {
    "1": "书柜",
    "2": "快递"
}
//订单状态
const statusConfig = {
    "0": "待发货",
    "1": "待收书/已发货",
    "2": "待归还",
    "3": "审核中",
    "4": "审核未通过"
}

const BorrowOSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const stateSelect = ['全部', '1', '2'];
        const timeSelect = ['借书时间', '还书时间', '创建时间'];
        const styleSelect = ['全部', '1', '2'];
        return (
            <Form layout="inline">
                <Form.Item label="状态">
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
                <Form.Item label="借书方式">
                    {getFieldDecorator('style', { initialValue: stateSelect[0] })(
                        <Select style={{ width: 120 }}>
                            {styleSelect.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="快递编号">
                    {getFieldDecorator('postID')(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery1')(
                        <Input placeholder="昵称/账号模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery2')(
                        <Input placeholder="书籍名称/电子标签模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

const CloseForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        return (
            <Form>
                <Form.Item
                    label="如果是，请选择如何处理书籍"
                >
                    {getFieldDecorator('handle', { initialValue: 'lose' })(
                        <Radio.Group>
                            <Radio value="lose">书籍丢失报损</Radio>
                            <Radio value="storage">书籍重新入库</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
            </Form>
        );
    }
);

class BorrowO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,//快递待收书时关闭订单
            modal1Loading: false,
            modal2: false,//详情
            modal3: false,//发快递
            modal4: false,//发书柜
            modal5: false,//接单
            modal6: false,//上柜
            modal7: false,//重新审核
        }
        this.params = {
            currentPage: 1,//当前页面
            pageSize: 10,//每页大小
        }
    }

    componentDidMount() {
        this.requestList();
    }
    requestList = () => {
        fetch(`${Url}/curborrowrecords?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
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
                        bsBookcellinfo: i.bsBookinstore.bsBookcellinfo,
                        rfid: i.bsBookinstore.rfid,
                        deliverType: i.deliverType,
                        startTime: moment(i.startTime).format("YYYY-MM-DD HH:mm:ss"),
                        createTime: moment(i.createTime).format("YYYY-MM-DD HH:mm:ss"),
                        status: i.status,
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }
    handleSave(row) {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        // this.setState({ dataSource: newData });
    }
    orderDetail(record) {
        this.showModal('modal2');
    }
    closeOrder(record) {
        let { borrowStyle, state } = record;
        //借书方式为书柜 订单状态为待发货、待出库、待收书
        if (borrowStyle === 1 && [0, 1, 3].includes(state)) {
            this.handleSave({ ...record, state: 7 });//订单已取消
            if (state === 3) {
                console.log('将对应格子修改为可借阅');
            }
        }
        //借书方式为快递，订单待收书状态
        if (borrowStyle === 0 && state === 3) {
            this.showModal('modal1');
        }
    }
    acceptOrder(record) {
        confirm({
            title: '确定接单',
            onOk: () => {
                this.handleSave({ ...record, state: 2 });//订单配送中
            }
        });
    }
    intoCase(record) {
        confirm({
            title: '确定上柜',
            onOk: () => {
                this.handleSave({ ...record, state: 3 });//订单待收书
            }
        });
    }
    postDelivery() {
        this.showModal('modal3');
    }
    caseDelivery() {
        this.showModal('modal4');
    }
    handleMadal1Ok() {
        let value = this.closeForm_ref.props.form.getFieldValue('handle');
        if (value === 'storage') {
            this.setState({ modal1Loading: true });
            setTimeout(() => {
                console.log('仓库人员确认书籍已回到仓库');
                this.setState({ modal1: false, modal1Loading: false, });
            }, 2000);
        } else {
            this.setState({ modal1Loading: true });
            setTimeout(() => {
                console.log('系统自动生成一张类型为报损的出库单');
                this.setState({ modal1: false, modal1Loading: false, });
            }, 2000);
        }
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
            { title: '货位', dataIndex: 'bsBookcellinfo' },
            { title: '电子标签', dataIndex: 'rfid' },
            { title: '借书方式', dataIndex: 'deliverType', render: (i) => (deliverTypeConfig[i]) },
            { title: '借书时间', dataIndex: 'startTime' },
            // { title: '还书方式', dataIndex: 'returnStyle', render: (i) => style[i] },
            // { title: '还书时间', dataIndex: 'returnTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            { title: '订单状态', dataIndex: 'status', render: (i) => (statusConfig[i]) },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    action[record.deliverType][record.status].map((i, index) => (
                        <span key={index}>
                            <a onClick={() => { i.onClick(record) }}>{i.label}</a>
                            <Divider type="vertical" />
                        </span>
                    ))
                ),
            }];

        //操作方式
        //TODO: 需求不明确
        const action = {
            "1": {
                "0": [{ label: '发书柜', onClick: () => { this.caseDelivery() } }, { label: '关闭订单', onClick: (record) => { this.closeOrder(record) } }],
                "1": [{ label: '发书柜', onClick: () => { this.caseDelivery() } }, { label: '关闭订单', onClick: (record) => { this.closeOrder(record) } }],
                "2": [{ label: '接单', onClick: (record) => { this.acceptOrder(record) } }, { label: '关闭订单', onClick: (record) => { this.closeOrder(record) } }],
                "3": [{ label: '上柜', onClick: (record) => { this.intoCase(record) } }],
                "4": [{ label: '关闭订单', onClick: (record) => { this.closeOrder(record) } }],
            },
            "2": {
                "0": [{ label: '重新审核', onClick: () => { } }],
                "1": [{ label: '重新审核', onClick: () => { } }],
                "2": [{ label: '重新审核', onClick: () => { } }],
                "3": [{ label: '重新审核', onClick: () => { } }],
                "4": [{ label: '重新审核', onClick: () => { } }],
            }
        }

        return (
            <div className="">
                <BreadcrumbCustom first="订单管理" second="借阅订单" />
                <Card
                    title="借阅订单"
                >
                    <BorrowOSearchForm />
                    <div style={{ textAlign: 'right' }}><Button type="primary">导出</Button></div><br />
                    <Table className="borrowO-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
                <Modal
                    title="您确定要关闭此订单吗？"
                    visible={this.state.modal1}
                    onOk={() => { this.handleMadal1Ok() }}
                    confirmLoading={this.state.modal1Loading}
                    onCancel={() => { this.closeModal('modal1') }}
                >
                    <CloseForm wrappedComponentRef={ref => { this.closeForm_ref = ref }} />
                </Modal>
                <OrderDet
                    visible={this.state.modal2}
                    onCancel={() => { this.closeModal('modal2') }}
                    borrowWay='case'
                    returnWay='case'
                />
                <DeliveryModal
                    type='post'
                    visible={this.state.modal3}
                    onCancel={() => { this.closeModal('modal3') }}
                    onSave={() => { console.log('保存') }}
                    onConfirm={() => { console.log('确定发货') }}
                />
                <DeliveryModal
                    type="case"
                    visible={this.state.modal4}
                    onCancel={() => { this.closeModal('modal4') }}
                    onSave={() => { console.log('保存') }}
                    onConfirm={() => { console.log('确定发货') }}
                />
            </div>
        )
    }
}

export default BorrowO;