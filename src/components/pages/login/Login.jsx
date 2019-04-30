/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PwaInstaller } from '../../widget';
import { actionCreators } from './store';

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        //?
        // const { receiveData } = this.props;
        // receiveData(null, 'auth');
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        // const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        // if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
        //     localStorage.setItem('user', JSON.stringify(nextAuth.data));
        //     history.push('/');
        // }
        const { user, history } = this.props;
        if (user) { // 判断是否登陆
            // console.log('componentDidUpdate',user);
            // localStorage.setItem('user', JSON.stringify(nextAuth.data));
            sessionStorage.setItem("session",JSON.stringify(user.session));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let formData = this.props.form.getFieldsValue();
        console.log('formData',formData);
        this.props.login(
            formData.userName,
            formData.password
        )
    };

    render() {
        const { user } = this.props;
        console.log(user);
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>鱼阅后台管理系统</span>
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

const mapStateToPorps = state => ({
    user: state.getIn(['login', 'user'])
});
const mapDispatchToProps = dispatch => ({
    login(userNameElem, passwordElem) {
        console.log('111111',userNameElem, passwordElem);
        dispatch(actionCreators.login(userNameElem, passwordElem));
    }
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));