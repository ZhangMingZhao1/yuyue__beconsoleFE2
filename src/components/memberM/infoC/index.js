
import React from 'react';
// import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';



class InfoC extends React.Component {
    
    render() {
        return (
            <div className="">
                <BreadcrumbCustom first="会员管理" second="信息管理"/>
                我是信息管理
            </div>
        )
    }
}

export default InfoC;