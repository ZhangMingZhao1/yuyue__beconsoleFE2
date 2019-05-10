import React from 'react';
import { Modal } from 'antd';

class ToCabinet extends React.Component {

    render() {
        return (
            <Modal
                title="发书柜"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                发书柜
            </Modal>
        );
    }
}

export default ToCabinet;
