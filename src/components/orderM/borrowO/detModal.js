import React from 'react';
import { Modal, Row, Col } from 'antd';
import URL from '../../../api/config';
import moment from 'moment';
import './detModal.less';

class DetModal extends React.Component {

    state = {
        initValue: []
    }

    componentDidMount() {
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

    render() {
        switch (this.state.initValue.deliverType) {
            case 1:
                return <CabinetDet
                    initValue={this.state.initValue}
                    handleOk={this.props.handleOk}
                    handleCancel={this.props.handleCancel}
                    visible={this.props.visible}
                />;
            case 2:
                return <ExpressDet
                    initValue={this.state.initValue}
                    handleOk={this.props.handleOk}
                    handleCancel={this.props.handleCancel}
                    visible={this.props.visible}
                />;
            default:
                return null;
        }
        // return (
        //     <div>
        //         <ExpressDet initValue={this.state.initValue} handleOk={this.props.handleOk} handleCancel={this.props.handleCancel} visible={this.props.visible} />
        //         {/* <CabinetDet initValue={this.state.initValue} handleOk={this.props.handleOk} handleCancel={this.props.handleCancel} visible={this.props.visible} /> */}
        //     </div>
        // );
    }
}

class ExpressDet extends React.Component {

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
        ]
    }

    handleOk = (e) => {
        this.props.handleOk(e);
    }

    handleCancel = (e) => {
        this.props.handleCancel(e);
    }

    vipNoReplace = (no) => {
        return no.substr(0, 3) + '****' + no.substr(7, 11);
    }

    render() {
        const option = this.state.option;
        return (
            <Modal
                className="detModal-modal"
                title="详情"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row>
                    <Col span={4}>
                        <label>订单ID：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.orderNo}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>书籍名称：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.bsBookinfo.bookName}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>电子标签：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.bsBookinfo.isbn}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>创建时间：</label>
                    </Col>
                    <Col span={20}>
                        <span>{moment(this.props.initValue.createTime).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>会员账号：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.vipNoReplace(this.props.initValue.vipNo)}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>订单ID：</label>
                    </Col>
                    <Col span={20}>
                        <span>{moment(this.props.initValue.expireTime).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col span={4}>
                        <label>借书方式：</label>
                    </Col>
                    <Col span={8}>
                        <span>线上</span>
                    </Col>
                    <Col span={4}>
                        <label>配送方式：</label>
                    </Col>
                    <Col span={8}>
                        <span>快递</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>进度：</label>
                    </Col>
                    <Col span={8}>
                        <span>{option[this.props.initValue.status]}</span>
                    </Col>
                    <Col span={4}>
                        <label>创建时间：</label>
                    </Col>
                    <Col span={8}>
                        <span>{moment(this.props.initValue.createTime).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>收件人：</label>
                    </Col>
                    <Col span={8}>
                        <span>{this.props.initValue.nikeName}</span>
                    </Col>
                    <Col span={4}>
                        <label>联系电话：</label>
                    </Col>
                    <Col span={8}>
                        <span>{this.props.initValue.phone}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>收货地址：</label>
                    </Col>
                    <Col span={20}>
                        {/* TODO 后端缺字段 */}
                        <span>收货地址</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>快递公司：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>顺丰快递</span>
                    </Col>
                    <Col span={4}>
                        <label>快递订单：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>4573454932789</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>快递费：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>22元</span>
                    </Col>
                    <Col span={4}>
                        <label>费用状态：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>已支付</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>仓管：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>李三</span>
                    </Col>
                    <Col span={4}>
                        <label>寄件时间：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>时间</span>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

class CabinetDet extends React.Component {

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
        ]
    }

    handleOk = (e) => {
        this.props.handleOk(e);
    }

    handleCancel = (e) => {
        this.props.handleCancel(e);
    }

    vipNoReplace = (no) => {
        return no.substr(0, 3) + '****' + no.substr(7, 11);
    }

    render() {
        // console.log(this.props.initValue)
        const option = this.state.option;
        return (
            <Modal
                className="detModal-modal"
                title="详情"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row>
                    <Col span={4}>
                        <label>订单ID：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.orderNo}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>书籍名称：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.bsBookinfo.bookName}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>电子标签：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.bsBookinfo.isbn}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>创建时间：</label>
                    </Col>
                    <Col span={20}>
                        <span>{moment(this.props.initValue.createTime).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>会员账号：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.vipNoReplace(this.props.initValue.vipNo)}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>订单ID：</label>
                    </Col>
                    <Col span={20}>
                        <span>{moment(this.props.initValue.expireTime).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>会员账号：</label>
                    </Col>
                    <Col span={20}>
                        <span>{this.vipNoReplace(this.props.initValue.vipNo)}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>订单ID：</label>
                    </Col>
                    <Col span={20}>
                        <span>{moment(this.props.initValue.expireTime).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col span={4}>
                        <label>借书方式：</label>
                    </Col>
                    <Col span={8}>
                        <span>线上</span>
                    </Col>
                    <Col span={4}>
                        <label>配送方式：</label>
                    </Col>
                    <Col span={8}>
                        <span>快递</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>进度：</label>
                    </Col>
                    <Col span={8}>
                        <span>{option[this.props.initValue.status]}</span>
                    </Col>
                    <Col span={4}>
                        <label>创建时间：</label>
                    </Col>
                    <Col span={8}>
                        <span>{moment(this.props.initValue.createTime).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>收件人：</label>
                    </Col>
                    <Col span={8}>
                        <span>{this.props.initValue.nikeName}</span>
                    </Col>
                    <Col span={4}>
                        <label>联系电话：</label>
                    </Col>
                    <Col span={8}>
                        <span>{this.props.initValue.phone}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>收货地址：</label>
                    </Col>
                    <Col span={20}>
                        {/* TODO 后端缺字段 */}
                        <label>收货地址</label>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>快递公司：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>顺丰快递</span>
                    </Col>
                    <Col span={4}>
                        <label>快递订单：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>4573454932789</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>快递费：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>22元</span>
                    </Col>
                    <Col span={4}>
                        <label>费用状态：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>已支付</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <label>仓管：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>李三</span>
                    </Col>
                    <Col span={4}>
                        <label>寄件时间：</label>
                    </Col>
                    <Col span={8}>
                        {/* TODO 后端缺字段 */}
                        <span>时间</span>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default DetModal;
