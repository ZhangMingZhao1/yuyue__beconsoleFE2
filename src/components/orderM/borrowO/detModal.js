import React from 'react';
import { Modal, Row, Col } from 'antd';
import URL from '../../../api/config'

class DetModal extends React.Component {

    state = {
        initValue: []
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${URL}/borrowrecords/${this.props.orderId}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.curborrowrecord)
                this.setState({
                    initValue: data.curborrowrecord
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        switch (this.state.initValue.deliverType) {
            case 1:
                return <CabinetDet initValue={this.state.initValue} handleOk={this.props.handleOk} handleCancel={this.props.handleCancel} visible={this.props.visible} />;
            case 2:
                return <ExpressDet initValue={this.state.initValue} handleOk={this.props.handleOk} handleCancel={this.props.handleCancel} visible={this.props.visible} />;
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

    handleOk = (e) => {
        this.props.handleOk(e);
    }

    handleCancel = (e) => {
        this.props.handleCancel(e);
    }

    render() {

        return (
            <Modal
                title="快递"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row>
                    <Col span={12}>
                        <span>{123}</span>
                    </Col>
                    <Col span={12}>
                        <span>{123}</span>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

class CabinetDet extends React.Component {

    handleOk = (e) => {
        this.props.handleOk(e);
    }

    handleCancel = (e) => {
        this.props.handleCancel(e);
    }

    render() {

        return (
            <Modal
                title="书柜"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row>
                    <Col span={4}>
                        <span>订单ID：</span>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.orderNo}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <span>书籍名称：</span>
                    </Col>
                    <Col span={20}>
                        <span>{this.props.initValue.bookName}</span>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default DetModal;
