// import axios from 'axios';
import * as constants from './constants';
// import api from '../../../../api/api'; 
// import '../mock';
const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (userName, password) => {
	return (dispatch) => {
		fetch('http://localhost:3000/login',{
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
				dispatch(changeLogin())
			}else {
				alert('登陆失败')
			}
		}).catch((err)=>{
			console.log(err);
		})
	}
}