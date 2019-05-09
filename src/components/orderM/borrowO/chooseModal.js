import React from 'react';
import DetModal from './detModal';
import ToCabinet from './toCabinet';
import CloseModal from './closeModal';
import RetrialModal from './retrialModal';
import ToExpress from './toExpress';

const chooseModal = (optId, orderStatusId, deliverType, handleOk, handleCancel, visible) => {
    switch (deliverType) {
        case 1:
            switch (orderStatusId) {
                case 0:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        case 2:
                            return <ToCabinet handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        case 4:
                            return <CloseModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 1:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        case 4:
                            return <CloseModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 2:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 3:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 4:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        case 3:
                            return <RetrialModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        case 2:
            switch (orderStatusId) {
                case 0:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        case 2:
                            return <ToExpress handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 1:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        case 4:
                            return <CloseModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 2:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 3:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        default:
                            return null;
                    }
                case 4:
                    switch (optId) {
                        case 1:
                            return <DetModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
                        case 3:
                            return <RetrialModal handleOk={handleOk} handleCancel={handleCancel} visible={visible} />
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
