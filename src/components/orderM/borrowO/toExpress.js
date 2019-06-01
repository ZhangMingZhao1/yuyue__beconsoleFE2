import React from 'react';
import { Modal, Row, Col } from 'antd';
import moment from 'moment';
import URL from '../../../api/config';

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
    }

    handleCancel = (e) => {
        this.props.handleCancel(e);
    }

    vipNoReplace = (no) => {
        return no.substr(0, 3) + '****' + no.substr(7, 11);
    }

    render() {
        // console.log(this.props.orderId);
        const { option, initValue } = this.state;
        // console.log(initValue);
        return (
            <Modal
                title="发快递"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row>
                    <Col span={4}>
                        <span>订单ID：</span>
                    </Col>
                    <Col span={20}>
                        <span>{initValue ? initValue.orderNo : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <span>创建时间：</span>
                    </Col>
                    <Col span={20}>
                        <span>{initValue ? moment(initValue.createTime).format("YYYY-MM-DD HH:MM:SS") : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <span>会员账号：</span>
                    </Col>
                    <Col span={20}>
                        <span>{!!initValue.vipNo ? this.vipNoReplace(initValue.vipNo) : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <span>进度：</span>
                    </Col>
                    <Col span={20}>
                        <span>{initValue ? option[initValue.status] : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <span>书籍名称：</span>
                    </Col>
                    <Col span={20}>
                        <span>{!!initValue.bsBookinfo ? initValue.bsBookinfo.bookName : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <span>ISBN：</span>
                    </Col>
                    <Col span={20}>
                        <span>{!!initValue.bsBookinfo ? initValue.bsBookinfo.isbn : null}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <span>货位：</span>
                    </Col>
                    <Col span={20}>
                        {/* TODO 后端缺字段 */}
                        <span>56-35</span>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default ToExpress;
