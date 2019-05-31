import { message } from "antd";
import Url from '../../../api/config';

export default {
    getWareHouses(){
        fetch(`${Url}/warehouse/storagerecords`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                if(result.code!=1){
                    return result;
                }else{
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    },
}