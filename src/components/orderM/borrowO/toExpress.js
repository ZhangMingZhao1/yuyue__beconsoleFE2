import React from 'react';
import { Modal } from 'antd';

class ToExpress extends React.Component {

    render() {
        return (
            <Modal
                title="发快递"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                发快递
            </Modal>
        );
    }
}

export default ToExpress;
