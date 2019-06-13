import { message } from "antd";
import Url from '../../../api/config';
import { parseParams } from "../../../axios/tools";

export default {
    /**
     * 仓库键值对
     */
    getWareHouses() {
        return fetch(`${Url}/warehouse/warehouses`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 仓库的柜子键值对
     * @param {*} warehouseId 仓库id
     */
    getCaseInfos(warehouseId) {
        return fetch(`${Url}/warehouse/bookcaseinfos/${warehouseId}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 所有柜子信息获取
     */
    getAllCaseInfos() {
        return fetch(`${Url}/warehouse/bookcaseinfos`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 仓库货位获取
     * @param {*} warehouseId 仓库id
     */
    getLocations(warehouseId) {
        return fetch(`${Url}/warehouse/locations/${warehouseId}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    let data = {};
                    result.map(i => { data[i.locationId] = i.locationName })
                    return Promise.resolve(data);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 用户仓库货位获取
     */
    getUserWarehouses() {
        return fetch(`${Url}/warehouse/userwarehouses`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    let data = {};
                    result.map(i => { data[i.warehouseId] = i.warehouseName })
                    return Promise.resolve(data);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 根据条码获取商品信息
     * @param {*} code 条码
     */
    getInfoByCode(code) {
        return fetch(`${Url}/warehouse/bookinstores/${code}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 检测rfid是否已经存在
     * @param {*} rfid 
     */
    getRfidStatus(rfid) {
        return fetch(`${Url}/warehouse/bookinstores/${rfid}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 根据storageId获取库单
     * @param {*} storageId 
     */
    getStorageRecordsById(storageId) {
        return fetch(`${Url}/warehouse/storagerecords/${storageId}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 库存查询
     * @param {*} params 查询参数(Json格式)
     */
    getBookInStores(params) {
        return fetch(`${Url}/warehouse/bookinstores?${parseParams(params)}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (!result.code) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 出入单查询
     * @param {*} params 查询参数(Json格式)
     */
    getStorageRecords(params) {
        return fetch(`${Url}/warehouse/storagerecords?${parseParams(params)}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (!result.code) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 更新库单
     * @param {*} reqBody 请求Body(Json格式)
     */
    putStorageRecords(reqBody) {
        return fetch(`${Url}/warehouse/storagerecords`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(reqBody)
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
                return Promise.reject(result.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 增加库单
     * @param {*} reqBody 请求Body(Json格式)
     */
    postStorageRecords(reqBody) {
        return fetch(`${Url}/warehouse/storagerecords`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody),
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     *  删除库单
     * @param {*} storageId 
     */
    deleteStorageRecords(storageId) {
        return fetch(`${Url}/warehouse/storagerecords/${storageId}`, {
            method: 'DELETE',
            credentials: 'include',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 修改库单状态
     * @param {*} storageId 库单Id
     * @param {*} status 状态
     */
    putStorageRecordsStatus(storageId, status) {
        return fetch(`${Url}/warehouse/storagerecords/${storageId}/${status}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 移库单查询
     */
    getTransferRecords(params) {
        return fetch(`${Url}/warehouse/transferrecords?${parseParams(params)}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (!result.code) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 根据transferId获取移库单
     * @param {*} transferId 
     */
    getTransferRecordsById(transferId) {
        return fetch(`${Url}/warehouse/transferrecords/${transferId}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 增加移库单
     * @param {*} reqBody 请求Body(Json格式)
     */
    postTransferRecords(reqBody) {
        return fetch(`${Url}/warehouse/transferrecords`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody),
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 更新移库单
     * @param {*} reqBody 请求Body(Json格式)
     */
    putTransferRecords(reqBody) {
        return fetch(`${Url}/warehouse/transferrecords`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(reqBody)
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
                return Promise.reject(result.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     *  删除移库单
     * @param {*} transferId 移库单Id
     */
    deleteTransferRecords(transferId) {
        return fetch(`${Url}/warehouse/transferrecords/${transferId}`, {
            method: 'DELETE',
            credentials: 'include',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 修改移库单状态
     * @param {*} transferId 移库单Id
     * @param {*} status 状态
     */
    putTransferRecordsStatus(transferId, status) {
        return fetch(`${Url}/warehouse/transferrecords/${transferId}/${status}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 调拨单查询
     */
    getBookcaseRecords(params) {
        return fetch(`${Url}/warehouse/bookcaserecords?${parseParams(params)}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (!result.code) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 根据bookcaseId获取调拨单
     * @param {*} bookcaseId 
     */
    getTransferRecordsById(bookcaseId) {
        return fetch(`${Url}/warehouse/transferrecords/${bookcaseId}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if (result.code !== 1) {
                    return Promise.resolve(result);
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    /**
     * 增加调拨
     * @param {*} reqBody 请求Body(Json格式)
     */
    postBookcaseRecords(reqBody) {
        return fetch(`${Url}/warehouse/bookcaserecords`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody),
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 更新调拨单
     * @param {*} reqBody 请求Body(Json格式)
     */
    putBookcaseRecords(reqBody) {
        return fetch(`${Url}/warehouse/bookcaserecords`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(reqBody)
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
                return Promise.reject(result.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     *  删除调拨单
     * @param {*} bookcaseId 调拨单Id
     */
    deleteBookcaseRecords(bookcaseId) {
        return fetch(`${Url}/warehouse/bookcaserecords/${bookcaseId}`, {
            method: 'DELETE',
            credentials: 'include',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * 修改调拨单状态
     * @param {*} bookcaseId 调拨单Id
     * @param {*} status 状态
     */
    putBookcaseRecordsStatus(bookcaseId, status) {
        return fetch(`${Url}/warehouse/bookcaserecords/${bookcaseId}/${status}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                return Promise.resolve(result);
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
}