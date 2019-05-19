import React from 'react';
import { Modal } from 'antd';

class CloseModal extends React.Component {

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
                title="关闭订单"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                关闭订单
            </Modal>
        );
    }
}

export default CloseModal;
