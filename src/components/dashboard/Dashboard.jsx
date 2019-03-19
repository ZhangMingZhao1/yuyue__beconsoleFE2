/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import URL from '../../api/config';



class Dashboard extends React.Component {
    state={data:{}};
    componentDidMount(){
        fetch(`${URL.ceshiURL}/home`,{method:'GET'})
            .then((res)=>res.json())
            .then(data=>{
                this.setState({data:data.data})
            }).catch(err=>{console.log(err)})
    }
    render() {
        // console.log(`${ceshiURL}/home`);
        // console.log(ceshiURL);
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <div>您有{this.state.data.allocation}个书柜待调拨新书</div>
                <div>您有{this.state.data.repair}个书柜格子待维修</div>
            </div>
        )
    }
}

export default Dashboard;