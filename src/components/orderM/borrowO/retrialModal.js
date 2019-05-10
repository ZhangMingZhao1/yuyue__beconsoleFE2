import React from 'react';
import { Modal } from 'antd';

class RetrialModal extends React.Component {

    render() {
        return (
            <Modal
                title="重新审核"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                重新审核
            </Modal>
        );
    }
}

export default RetrialModal;
