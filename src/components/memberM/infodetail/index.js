import React from 'react';
import { Tabs, Card, Row, Col} from 'antd';
import BaseInfo from './baseInfo';
import './index.less'
import AccountInfo from './accountInfo';
import PayRecord from './payRecord';
import BorrowRecord from './borrowRecord';
import DonateRecord from './donateRecord';
import AddresssInfo from './addressInfo';
import PointRecord from './pointRecord';
import CommentRecord from './commentRecord';
const TabPane = Tabs.TabPane;

class InfoDetail extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
      }
      callback = (key)=>{
        console.log(key);
      }
    render() {
        let id = this.props.match.params.memberId;
        return (
            <div>
            <Card
                title="会员信息查看"
            >
            <div className="card-container">
                {/* 这里是InfoDetail{id}的页面 */}
                <Tabs defaultActiveKey="1" type="card" size="large" onChange={this.callback}>
                    <TabPane tab="基本信息" key="1"><BaseInfo/></TabPane>
                    <TabPane tab="账户信息" key="2"><AccountInfo/></TabPane>
                    <TabPane tab="续费记录" key="3"><PayRecord/></TabPane>
                    <TabPane tab="借阅记录" key="4"><BorrowRecord/></TabPane>
                    <TabPane tab="捐书记录" key="5"><DonateRecord/></TabPane>
                    <TabPane tab="地址&书柜" key="6"><AddresssInfo/></TabPane>
                    <TabPane tab="积分记录" key="7"><PointRecord/></TabPane>
                    <TabPane tab="评价记录" key="8"><CommentRecord/></TabPane>
                </Tabs>
                </div>
                </Card>

            </div>
        );
    }
}
export default InfoDetail;