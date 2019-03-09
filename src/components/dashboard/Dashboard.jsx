/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';




class Dashboard extends React.Component {
    
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <div>您有x个书柜待调拨新书</div>
                <div>您有x个书柜格子待维修</div>
            </div>
        )
    }
}

export default Dashboard;