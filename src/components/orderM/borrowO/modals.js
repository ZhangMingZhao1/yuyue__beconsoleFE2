import React from 'react';
import { Modal } from 'antd';

class Modals extends React.Component {

    // 传入一个id，根据id修改显示不同的Modal

    state = {
        detailModals: false,// 详情
        expressModals: false,// 发快递
        toCabModals: false,// 发书柜
        retrialModals: false,// 重新审核
        closeModals: false,// 关闭订单
    }

    showModal = () => {

    }

    handleOk = (e) => {
        // console.log(e);

    }

    handleCancel = (e) => {
        // console.log(e);

    }

    render() {

        const { detailModals, expressModals, toCabModals, retrialModals, closeModals } = this.state;
        console.log(this.props);

        return (
            <Modal
                title="详情"
                visible={detailModals}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                测试
            </Modal>
        );
    }
}

export default Modals;
