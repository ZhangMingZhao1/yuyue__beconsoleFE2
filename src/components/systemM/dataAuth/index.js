import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tree, Card, Divider,Modal,Button } from "antd";
import URL from '../../../api/config'
import { connect } from 'react-redux';
import "./index.less";
const { TreeNode } = Tree;

const mockData = [
    {
        house:"北京一仓",key:"100",
        case:[{key:"1",name:"万科1号柜"},{key:"6",name:"万科2号柜"},{key:"7",name:"万科3号柜"}],
    },
    {
        house:"北京六仓",
        case:[{key:"3",name:"世纪家园1号柜"},{key:"4",name:"世纪家园2号柜"},{key:"5",name:"世纪家园3号柜"}],
    },
]

const mockAllCase = [
    {
        name:"北京一仓",key:"100",
        case:[{key:1,name:"万科1号柜"},{key:66,name:"万科2号柜"},{key:77,name:"万科3号柜"},{key:11,name:"万科4号柜"}],
    },
    {
        name:"北京六仓",
        case:[{key:"33",name:"世纪家园1号柜"},{key:"44",name:"世纪家园2号柜"},{key:"55",name:"世纪家园3号柜"},{key:"12",name:"世纪家园4号柜"}],
    },
]


class DataAuth extends Component {
  state = {
    // treeData: [
    //   { title: "总部", key: "0" },
    // ]
    treeData: [],
    visible : false,
    checkedKeys: ['100'],
    selectedKeys: ["100"],
  };

  componentDidMount() {
      fetch(`${URL}/system/institutions`,{credentials:"include"})
        .then(res=>res.json())
        .then(data=>{this.setState({treeData:data})})
  }

  handleLeafClick = ()=>{
      fetch(``,{credentials:"include"})
        .then(res=>res.json)
        .then(data=>{

        })  
  }
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  renderTreeNodes = data =>
    data.map(item => {
      if (item.beInstitutions) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.beInstitutions)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} onClick={this.handleLeafClick}/>;
    });

  renderTreeNodes2 = data =>{
    console.log(data);
    return (
        data.map(item => {
        if (item.case) {
            return (
            <TreeNode title={item.name} key={item.key} dataRef={item}>
                {this.renderTreeNodes2(item.case)}
            </TreeNode>
            );
        }
        return <TreeNode title={item.name} key={item.key}/>;
        })
    )}

    showModal = ()=> {
        this.setState({visible: true,})
    }
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      
      onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        // this.setState({ checkedKeys });
      };
  render() {

    const user = {
        "message": "",
        "data": {
          "uid": 2,
          "userName": "wujian",
          "telephone": "15200429735",
          "registrationtime": 1551855705000,
          "status": 1,
          "password": null,
          "beDepartment": {
            "id": 2,
            "name": "财务部"
          },
          "beInstitution": {
            "id": 5,
            "lever": 3,
            "name": "小阳街道",
            "beInstitutions": null
          },
          "role": "加盟商",
          "permissions": [
            "专题管理",
            "banner管理",
            "信息管理",
            "积分管理",
            "库存查询",
            "出库单"
          ],
          "roleType": 1
        },
        "session": "97A7BE6785BA1CCB802970F326C5601E",
        "fetching": false
      };
    // const { user } = this.props;
    let data = user.data;
    // let permissions = data.permissions.toString();
    let userName = data.userName;
    let department = data.beInstitution.name || "无";
    let role = data.role;
    let resDOM = mockData.map((v,k)=>{
        return (
            <div className="datauth-flexbox">
                 <div className="left" >{v.house}</div>
                 <div className="right"> {
                     v.case.map((value,k)=>{
                         return ( <div className="caseinfo">{value.name}</div>)   
                     })
                 } </div>
             
            </div>


        )
    });

    return <div>
        <Modal 
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <Tree
                checkable 
                checkedKeys={this.state.checkedKeys}
                selectedKeys={this.state.selectedKeys}
                onCheck={this.onCheck}
                >{this.renderTreeNodes2(mockAllCase)}</Tree>
        </Modal>

        <Card>
            我是数据权限
            <Divider />
            <Tree >{this.renderTreeNodes(this.state.treeData)}</Tree>
        </Card>
        <Card>
            <div className="data-content">
                 <div className="onerow">{userName},{department},角色：{role}</div>
                 <div>关联：<Button onClick={this.showModal}>选择</Button></div>
                 <Divider />
                 <div className="dataauth-box">
                       <div className="headerow" style={{marginRight:500}}><span>仓库</span></div>
                       <div className="headerow"><span>柜子</span></div> 
                       {resDOM}
                 </div>
            </div>
        
        </Card>
    </div>;
  }
}


const mapStateToPorps = state => ({
    user: state.getIn(['login', 'user'])
});


export default connect(mapStateToPorps, null)(DataAuth);
