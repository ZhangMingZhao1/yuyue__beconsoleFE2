import axios from 'axios';
import * as constants from './constants';
// import api from '../../../../api/api'; 

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (accout, password) => {
	return (dispatch) => {
		axios.post('http://localhost/login').then((res) => {
			const result = res.data.data;
			if (result) {
				dispatch(changeLogin())
			}else {
				alert('登陆失败')
			}
		})
	}
}