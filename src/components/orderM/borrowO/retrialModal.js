import React from 'react';
import { Modal } from 'antd';

class RetrialModal extends React.Component {

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
                title="重新审核"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                重新审核
            </Modal>
        );
    }
}

export default RetrialModal;
