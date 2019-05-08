import React from 'react';
import { Modal } from 'antd';

class CloseModal extends React.Component {

    render() {
        return (
            <Modal
                title="关闭订单"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                关闭订单
            </Modal>
        );
    }
}

export default CloseModal;
