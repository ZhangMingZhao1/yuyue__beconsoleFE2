
import React from 'react';
// import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';



class BannerControl extends React.Component {
    render() {
        return (
            <div className="">
                <BreadcrumbCustom first="网站管理" second="banner管理"/>
                我是Banner管理
            </div>
        )
    }
}

export default BannerControl;