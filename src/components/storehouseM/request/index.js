import { message } from "antd";
import Url from '../../../api/config';

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
        return fetch(`${Url}//warehouse/bookcaseinfos/${warehouseId}`, { credentials: 'include' })
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
    getRecords(storgeId){

    }
}