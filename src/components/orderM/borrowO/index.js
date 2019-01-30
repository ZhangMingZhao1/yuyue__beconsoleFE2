import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, Divider, Pagination, Modal, Radio } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import OrderDet from './orderDet';
import DeliveryModal from './deliveryModal';

const { Option } = Select;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;

const BorrowOSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const stateSelect = ['全部', '1', '2'];
        const timeSelect = ['借书时间', '还书时间', '创建时间'];
        const styleSelect = ['全部', '1', '2'];
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
                    {getFieldDecorator('style', { initialValue: stateSelect[0] })(
                        <Select style={{ width: 120 }}>
                            {styleSelect.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='快递编号'>
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
        let id = 0;
        this.state = {
            dataSource: [
                { key: id++, borrowStyle: 0, state: 0 },
                { key: id++, borrowStyle: 1, state: 0 },
                { key: id++, borrowStyle: 1, state: 1 },
                { key: id++, borrowStyle: 1, state: 2 },
                { key: id++, borrowStyle: 1, state: 3 },
                { key: id++, borrowStyle: 0, state: 3 },
                { key: id++, borrowStyle: 0, state: 4 },
                { key: id++, borrowStyle: 0, state: 5 },
                { key: id++, borrowStyle: 0, state: 6 },
            ],
            modal1: false,//快递待收书时关闭订单
            modal1Loading: false,
            modal2: false,//详情
            modal3: false,//发快递
            modal3: false,//发书柜
        }
    }
    handleSave(row) {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
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
        this.showModal('modal3');
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
        const { dataSource } = this.state;
        const style = ['快递', '书柜'];
        const state = ['待发货', '待出库', '配送中', '待收书', '待归还', '审核中', '审核未通过', '已取消'];
        const action = new Array();
        for (let i = 0; i < style.length; i++) {
            action[i] = new Array();
            for (let j = 0; j < state.length; j++) {
                action[i][j] = [{ label: '详情', onClick: () => { this.orderDetail() } }];
            }
        }
        action[0][0].push({ label: '发快递', onClick: () => { this.postDelivery() } });
        action[1][0].push({ label: '发书柜', onClick: () => { this.caseDelivery() } }, { label: '关闭订单', onClick: (record) => { this.closeOrder(record) } });
        action[1][1].push({ label: '接单', onClick: (record) => { this.acceptOrder(record) } }, { label: '关闭订单', onClick: (record) => { this.closeOrder(record) } });
        action[1][2].push({ label: '上柜', onClick: (record) => { this.intoCase(record) } });
        action[0][3].push({ label: '关闭订单', onClick: (record) => { this.closeOrder(record) } });
        action[1][3] = action[0][3];
        action[0][6].push({ label: '重新审核', onClick: () => { } });
        action[1][6] = action[0][6];
        const columns = [
            { title: '订单编号', dataIndex: 'orderId' },
            { title: '会员账号', dataIndex: 'account' },
            { title: '会员昵称', dataIndex: 'nickName' },
            { title: '书籍名称', dataIndex: 'bookName' },
            { title: 'ISBN', dataIndex: 'isbn' },
            { title: '货位', dataIndex: 'goodsPos' },
            { title: '电子标签', dataIndex: 'tag' },
            { title: '借书方式', dataIndex: 'borrowStyle', render: (i) => style[i] },
            { title: '借书时间', dataIndex: 'borrowTime' },
            { title: '还书方式', dataIndex: 'returnStyle', render: (i) => style[i] },
            { title: '还书时间', dataIndex: 'returnTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            { title: '订单状态', dataIndex: 'state', render: (i) => state[i] },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    action[record.borrowStyle][record.state].map((i, index) => (
                        <span key={index}>
                            <a onClick={() => { i.onClick(record) }}>{i.label}</a>
                            <Divider type="vertical" />
                        </span>
                    ))
                ),
            }];

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
                        dataSource={dataSource}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
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
                    onSave={() => { }}
                    onConfirm={() => { }}
                />
                <DeliveryModal
                    type='case'
                    visible={this.state.modal4}
                    onCancel={() => { this.closeModal('modal4') }}
                    onSave={() => { }}
                    onConfirm={() => { }}
                />
            </div>
        )
    }
}

export default BorrowO;