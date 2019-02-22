/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PwaInstaller } from '../../widget';
import { actionCreators } from './store';
// import './mock';

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        //?
        // const { receiveData } = this.props;
        // receiveData(null, 'auth');
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let formData = this.props.form.getFieldsValue();
        console.log('formData',formData);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
            body: JSON.stringify({
                username: formData.userName,
                password: formData.password
            })
        };
        this.props.login(
            formData.userName,
            formData.password
        )
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToPorps = state => {
    console.log('state',state);
    // const { auth } = state.httpData;
    // return { auth };
};
const mapDispatchToProps = dispatch => ({
    login(userNameElem, passwordElem) {
        console.log('111111',userNameElem, passwordElem);
        dispatch(actionCreators.login(userNameElem.value, passwordElem.value));
    }
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));