import React from 'react';
import { Modal } from 'antd';

class UpToCase extends React.Component {

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
                title="上柜"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                上柜
            </Modal>
        );
    }
}

export default UpToCase;
