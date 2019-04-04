// import axios from 'axios';
import * as constants from './constants';
import Url from '../../../../api/config'; 
import { message } from 'antd';

const changeLogin = (data) => ({
	type: constants.CHANGE_LOGIN,
	value: data
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: null
})

export const login = (userName, password) => {
	return (dispatch) => {
		// console.log('`${baseURL}/login`',`${baseURL}/login`);
		fetch(`${Url}/login`,{
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			// credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
			body: JSON.stringify({
				userName: userName,
				password: password
			})
		}).then((res) => res.json()).then(data=>{
			console.log('loginData',data);
			const result = data;
			console.log('result.data:',result.data);
			if (result.data) {
				message.success('登陆成功');
				dispatch(changeLogin(result))
			}else {
				message.error(`${result.message}`);
			}
		}).catch((err)=>{
			console.log(err);
		})
	}
}

export const doLogout = ()=>{
	return (dispatch)=> {
		dispatch(logout())
	}
} 