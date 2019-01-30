import React from 'react';
import { Tabs, Card, Row, Col} from 'antd';
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
                这里是InfoDetail{id}的页面
                <Tabs defaultActiveKey="1" type="card" onChange={this.callback}>
                    <TabPane tab="基本信息" key="1">
                        <Card>
                            <Row>
                                <Col span={8}>用户名：</Col>
                                <Col span={8}>姓名：</Col>
                                <Col span={8}>性别：</Col>

                            </Row>
                            <Row>
                                <Col span={8}>证件号（身份证）：</Col>
                                <Col span={8}>手机号：</Col>
                                <Col span={8}>婚姻：</Col>
                            </Row>
                            <Row>
                                <Col span={8}>邮箱：</Col>
                                <Col span={8}>年龄：</Col>
                                <Col span={8}>状态：</Col>
                            </Row>
                            <Row>
                                <Col span={12}>居住地址：</Col>
                                <Col span={12}>注册时间：</Col>
                                
                            </Row>
                            <Row>
                                <Col span={8}>所属城市：</Col>
                                <Col span={8}>所属加盟商：</Col>
                                <Col span={8}>所属大客户：</Col>
                            </Row>
                        </Card>
                    </TabPane>
                    <TabPane tab="账户信息" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="续费记录" key="3">Content of Tab Pane 3</TabPane>
                    <TabPane tab="借阅记录" key="4">Content of Tab Pane 3</TabPane>
                    <TabPane tab="捐书记录" key="5">Content of Tab Pane 3</TabPane>
                    <TabPane tab="地址&书柜" key="6">Content of Tab Pane 3</TabPane>
                    <TabPane tab="积分记录" key="7">Content of Tab Pane 3</TabPane>
                    <TabPane tab="平价记录" key="8">Content of Tab Pane 3</TabPane>
                </Tabs>,
            </div>
        );
    }
}
export default InfoDetail;