import React from 'react';
import { Modal, Row, Col, Input, Form, Select } from 'antd';
import moment from 'moment';
import URL from '../../../api/config';
import './toCabinet.less';

const Option = Select.Option;
class ToCabinet extends React.Component {

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
                className="toCabinet-modal"
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
                <ToCabinetForm onSubmit={this.onSubmit} initValue={initValue} />
            </Modal>
        );
    }
}

const ToCabinetForm = Form.create()(
    class extends React.Component {

        state = {
            ywValues: []
        }

        componentDidMount() {
            fetch(`${URL}/system/userinfos`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    data.map(i => {
                        i.id = i.uid;
                        i.name = i.userName;
                    });
                    this.setState({
                        ywValues: data
                    })
                })
                .catch(err => console.log(err));
        }

        render() {

            const { getFieldDecorator } = this.props.form;
            const { initValue, onSubmit } = this.props;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                // !!initValue.bsBookinstore ? initValue.bsBookinstore.beLocation.locationName : null
                { type: 3, label: '书柜名称：', name: 'cabinetName', width: '150px', value: null },
                // !!initValue.bsBookinstore ? initValue.bsBookinstore.beLocation.locationCode : null
                { type: 3, label: '书柜编号：', name: 'cabinetName', width: '150px', value: null },
                { type: 2, label: '格子编号：', name: 'expressCom', width: '150px', placeholder: '请选择格子', value: [{ id: 0, name: '1234231' }, { id: 1, name: '432312312' }] },
                { type: 2, label: '运维人：', name: 'ywName', width: '150px', placeholder: '请选择运维', value: this.state.ywValues },
                { type: 1, label: '电子标签：', name: 'eLabel', width: '400px', placeholder: '请输入电子标签' },
                // { type: 2, label: '所属机构', name: 'beInstitution', width: '300px', value: this.state.beInstitutionValue },
                // { type: 2, label: '所属部门', name: 'beDepartment', width: '150px', value: this.state.beDepartmentValue },
            ];

            return (
                <Form onSubmit={onSubmit}>
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

export default ToCabinet;
