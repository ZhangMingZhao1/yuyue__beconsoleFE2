/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import { message, Modal } from 'antd';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({ url, msg = '接口异常', headers }) =>
    axios.get(url, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({ url, data, msg = '接口异常', headers }) =>
    axios.post(url, data, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });

export const fetchGet = (options) => {
    let base = 'https://easy-mock.com/mock/5c78d39c141be85de9c0add9';
    let params = options.data && options.data.param ? '?' + parseParams(options.data.params) : '';
    let url = base + options.url + params;
    console.log(url);

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors'
            },
            credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
        }).then(
            (res) => {
                if (res.status == '200') {//http请求成功
                    return res.json()
                } else {
                    reject(res);
                }
            }
        ).then(data => {
            if (data.code == '0') {//业务成功标识
                resolve(data);
            } else {
                Modal.info({
                    title: "提示",
                    content: data.msg
                })
            }
        }).catch((err) => {
            console.log('fetch error' + err);
        })
    });
}

function parseParams(data) {
    try {
        let tempArr = [];
        for (let i in data) {
            let key = encodeURIComponent(i);
            let value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        let urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}
