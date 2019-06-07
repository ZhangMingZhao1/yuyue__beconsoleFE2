import React from 'react';
import { Modal, Row, Col, Input, Form, Select } from 'antd';
import moment from 'moment';
import URL from '../../../api/config';
import './toExpress.less';

const Option = Select.Option;
class ToExpress extends React.Component {

    state = {
        option: [
            "待支付",
            "待发货",
            "待出库",
            "配送中",
            "待收书/已发货",
            "待归还",
            "审核中",
            "审核通过",
            "审核未通过",
            "逾期欠费",
            "已取消"
        ],
        initValue: {}
    }

    componentDidMount() {
        // console.log(this.props.orderId);
        this.requestList();
    }

    requestList = () => {
        fetch(`${URL}/order/borrowrecords/${this.props.orderId}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.curborrowrecord)
                this.setState({
                    initValue: data.curborrowrecord
                })
            })
            .catch(err => console.log(err));
    }

    handleOk = (e) => {
        this.props.handleOk(e);
        this.onSubmit(e);
    }

    handleCancel = (e) => {
        this.props.handleCancel(e);
    }

    vipNoReplace = (no) => {
        return no.substr(0, 3) + '****' + no.substr(7, 11);
    }

    onSubmit = (e) => {
        e.preventDefault();

    }

    render() {
        // console.log(this.props.orderId);
        const { option, initValue } = this.state;
        // console.log(initValue);

        return (
            <Modal
                className="toExpress-modal"
                title="发快递"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row>
                    <Col span={4}>
                        <label>订单ID：</label>
                    </Col>
                    <Col span={20}>
                        <span>{initValue ? initValue.orderNo : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>创建时间：</label>
                    </Col>
                    <Col span={20}>
                        <span>{initValue ? moment(initValue.createTime).format("YYYY-MM-DD HH:MM:SS") : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>会员账号：</label>
                    </Col>
                    <Col span={20}>
                        <span>{!!initValue.vipNo ? this.vipNoReplace(initValue.vipNo) : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>进度：</label>
                    </Col>
                    <Col span={20}>
                        <span>{initValue ? option[initValue.status] : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>书籍名称：</label>
                    </Col>
                    <Col span={20}>
                        <span>{!!initValue.bsBookinfo ? initValue.bsBookinfo.bookName : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>ISBN：</label>
                    </Col>
                    <Col span={20}>
                        <span>{!!initValue.bsBookinfo ? initValue.bsBookinfo.isbn : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>货位：</label>
                    </Col>
                    <Col span={20}>
                        {/* TODO 后端缺字段 */}
                        <span>56-35</span>
                    </Col>
                </Row>
                <hr />
                <ToExpressForm onSubmit={this.onSubmit} />
            </Modal>
        );
    }
}

const ToExpressForm = Form.create()(
    class extends React.Component {
        render() {

            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 1, label: '收件人：', name: 'userName', width: '150px', placeholder: '请输入收件人姓名' },
                { type: 1, label: '联系方式：', name: 'phoneNum', width: '150px', placeholder: '请输入收件人电话' },
                { type: 2, label: '快递公司：', name: 'expressCom', width: '150px', placeholder: '请选择快递公司', value: [{ id: 0, name: '顺丰速递' }, { id: 1, name: '申通快递' }] },
                { type: 1, label: '快递编号：', name: 'expressNo', width: '300px', placeholder: '请输入快递编号' },
                { type: 1, label: '收货地址：', name: 'address', width: '300px', placeholder: '请输入收件人收货地址' },
                { type: 3, label: '快递费：', name: 'expressCost', width: '150px', value: '22元' },
                { type: 3, label: '快递费状态：', name: 'expCostStatus', width: '150px', value: '未支付' },
                { type: 1, label: '电子标签：', name: 'eLabel', width: '400px', placeholder: '请输入电子标签' },
                // { type: 2, label: '所属机构', name: 'beInstitution', width: '300px', value: this.state.beInstitutionValue },
                // { type: 2, label: '所属部门', name: 'beDepartment', width: '150px', value: this.state.beDepartmentValue },
            ];

            return (
                <Form onSubmit={this.props.onSubmit}>
                    <Row>{
                        formItem.map(i => (
                            <Col key={i.name}>
                                <Form.Item label={i.label} {...formItemLayout}>
                                    {getFieldDecorator(i.name)((() => {
                                        switch (i.type) {
                                            case 1:
                                                return <Input placeholder={i.placeholder} style={{ width: `${i.width}` }} />
                                            case 2:
                                                return <Select style={{ width: `${i.width}` }} placeholder={i.placeholder}>
                                                    {i.value.map(v => (<Option key={v.id} value={`${v.id}`}>{v.name}</Option>))}
                                                </Select>
                                            case 3:
                                                return <span style={{ width: `${i.width}` }}>{i.value}</span>
                                            default:
                                                return null
                                        }
                                    })())}
                                </Form.Item>
                            </Col>
                        ))
                    }</Row>
                </Form>
            );
        }
    }
)

export default ToExpress;
