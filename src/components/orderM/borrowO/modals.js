import React from 'react';
import { Modal } from 'antd';
import DetModal from './detModal';
import chooseModal from './chooseModal';

class Modals extends React.Component {

    // 传入一个id，根据id修改显示不同的Modal

    // state = {
    //     detailModals: false,// 详情
    //     expressModals: false,// 发快递
    //     toCabModals: false,// 发书柜
    //     retrialModals: false,// 重新审核
    //     closeModals: false,// 关闭订单
    // }

    render() {

        // const { detailModals, expressModals, toCabModals, retrialModals, closeModals } = this.state;
        // console.log(this.props);

        // return (
        //     <Modal
        //         title="详情"
        //         visible={this.props.visible}
        //         onOk={this.props.handleOk}
        //         onCancel={this.props.handleCancel}
        //     >
        //         测试
        //     </Modal>
        // );
        const { visible, optId, orderId, orderStatusId, deliverType, handleOk, handleCancel } = this.props;
        return (
            chooseModal(optId, orderStatusId, deliverType, handleOk, handleCancel, visible, orderId)
        );
    }
}

export default Modals;
