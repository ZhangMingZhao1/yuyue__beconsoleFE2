import React from 'react';
import { } from 'antd';
import './roleAuth.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { connect } from 'react-redux';

class roleAuth extends React.Component {

    state = {
       
    }

    componentDidMount() {
       
    }

    render() {
        const { user } = this.props;
        let data = user.data;
        let permissions = data.permissions.toString();
        let userName = data.userName;
        let role = data.role;
        // console.log(user.permissions)
        return (
           <div>
               <div className="headerRole">
               {userName},你当前的角色为{role},你的权限是{permissions}
               </div>
               
           </div>
        );
    };
}
const mapStateToPorps = state => ({
    user: state.getIn(['login', 'user'])
});

export default connect(mapStateToPorps, null)(roleAuth);
