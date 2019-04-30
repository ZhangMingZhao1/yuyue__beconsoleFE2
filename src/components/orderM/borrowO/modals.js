import React from 'react';
import { Modal } from 'antd';

class Modals extends React.Component {

    // 传入一个id，根据id修改显示不同的Modal

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                测试
            </Modal>
        );
    }
}

export default Modals;
