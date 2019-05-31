import React from 'react';
import { Modal } from 'antd';

class ChangeMon extends React.Component {

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
                title="修改金额"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.andleCancel}
            >
                修改金额
            </Modal>
        );
    }
}

export default ChangeMon;
