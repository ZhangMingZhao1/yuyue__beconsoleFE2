import React from 'react';
import { Modal } from 'antd';

class DetModal extends React.Component {

    render() {
        return (
            <Modal
                title="详情"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                详情
            </Modal>
        );
    }
}

export default DetModal;
