import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
// import { receiveData } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import { ThemePicker } from './components/widget';

const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
        }
    }

    getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        // const { receiveData } = this.props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);
        if(clientWidth <= 992) {
            this.setState({collapsed:true});
        }
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        let user = this.props.auth;
        console.log('1111user',user);
        console.log('this.props',this.props);
        // console.log('11111111user',auth);
        // console.log(auth1.data);
        // const auth = {
        //     isFetching: false,
        //     data: {
        //         uid: 1, permissions: ["auth", "auth/testPage", "auth/authPage", "auth/authPage/edit", "auth/authPage/visit"],
        //         role: "系统管理员", roleType: 1, userName: "张三"}
        // }

        const auth = user?user:{data:{}};
        // if(auth!='null') {
            return (     
                <Layout>
                    <SiderCustom collapsed={this.state.collapsed} />
                    <ThemePicker />
                    <Layout style={{flexDirection: 'column'}}>
                        <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data|| {}} />
                        <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                            <Routes auth={auth} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                       111
                        </Footer>
                    </Layout>
                </Layout>
            );
        // }
    }
}

const mapStateToProps = state => {
    let auth = state.getIn(['login', 'user']);
    console.log('App111',auth);
    // return tmp=='null'?{user:{}}:tmp;
    return {auth};
    // user: state.getIn(['login', 'user'])
}


export default connect(mapStateToProps, null)(App);
