import React from 'react';
import DetModal from './detModal';
import ToCabinet from './toCabinet';
import CloseModal from './closeModal';
import RetrialModal from './retrialModal';
import ToExpress from './toExpress';
import GetOrderModal from './getOrderModal';
import UpToCase from './upToCase';
import ChangeMon from './changeMon';

const chooseModal = (optId, orderStatusId, deliverType, handleOk, handleCancel, visible, orderId) => {
    switch (deliverType) {
        case 1:// 书柜
            switch (orderStatusId) {
                case 1:// 待发货
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 2:
                            return <ToCabinet handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 4:
                            return <CloseModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 2:// 待出库
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 4:
                            return <CloseModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 6:
                            return <GetOrderModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 3:// 配送中
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 7:
                            return <UpToCase handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 4:// 待收书
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 5:// 待归还
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 6:// 审核中
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 7:// 审核通过
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 8:// 审核未通过
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 3:
                            return <RetrialModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 9:// 逾期欠费
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 5:
                            return <ChangeMon handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        case 2:// 快递
            switch (orderStatusId) {
                case 0:// 待支付
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 1:// 待发货
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 2:
                            return <ToExpress handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        // 测试
                        // return <ToCabinet handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 5:// 待归还
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 6:// 审核中
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 7:// 审核通过
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 8:// 审核未通过
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 3:
                            return <RetrialModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                case 9:// 逾期欠费
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        case 5:
                            return <ChangeMon handleOk={handleOk} handleCancel={handleCancel} visible={visible} orderId={orderId} />
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        default:
            return null;
    }
}

export default chooseModal;
