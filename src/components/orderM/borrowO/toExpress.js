import React from 'react';
import { Modal } from 'antd';

class ToExpress extends React.Component {

    handleOk = (e) => {
        this.props.handleOk(e);
    }

    handleCancel = (e) => {
        this.props.handleCancel(e);
    }

    render() {
        console.log(this.props.orderId);
        return (
            <Modal
                title="发快递"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.andleCancel}
            >
                发快递
            </Modal>
        );
    }
}

export default ToExpress;
