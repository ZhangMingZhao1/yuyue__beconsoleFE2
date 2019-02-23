// import axios from 'axios';
import * as constants from './constants';
import baseURL from '../../../../api/config'; 

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
		console.log('`${baseURL}/login`',`${baseURL}/login`);
		fetch(`${baseURL}/login`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
			body: JSON.stringify({
				username: userName,
				password: password
			})
		}).then((res) => res.json()).then(data=>{
			console.log(data);
			const result = data;
			if (result) {
				dispatch(changeLogin(result))
			}else {
				alert('登陆失败')
			}
		}).catch((err)=>{
			console.log(err);
		})
	}
}