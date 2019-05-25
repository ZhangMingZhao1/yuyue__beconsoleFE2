import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tree, Card, Divider, Modal, Button, message} from "antd";
import URL from "../../../api/config";
import { connect } from "react-redux";
import "./index.less";
const { TreeNode } = Tree;

class DataAuth extends Component {
  state = {
    treeImple: [],
    treePersonCase: [],
    treeAllcase: [],
    personTreeKeys: [],
    caseCheckedKeys: [],
    All: [],
    visible: false,
    checkedKeys: ["100"],
    selectedKeys: ["100"],
    // flag:false,
    // seletFlag:false,
  };

  componentDidMount() {
    this.fetchInpleData();
  }

  //获取机构信息
  fetchInpleData = uid => {
    fetch(`${URL}/system/institutions`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        this.setState({ treeImple: data });
      });
  };

  //获取某个人的柜子信息
  fetchPersonCaseData = uid => {
    fetch(`${URL}/system/warehousecase/${uid}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        this.setState({ treePersonCase: data });
      });
  };

  //获取要关联的全部柜子信息
  fetchAllCase = uid => {
    fetch(`${URL}/system/warehousecases/${uid}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        // console.log('ddddd',data.array.map((v)=>"case-"+v));
        this.setState({caseCheckedKeys:data.array.map((v)=>"case-"+v),treeAllcase:data.datas});
      });
  };

  onCheck =(checkedKeys)=>{
    console.log(caseCheckedKeys);
    this.setState({ caseCheckedKeys:checkedKeys});
    // console.log(this.state.caseCheckedKeys);
  }
  onPersonCheck = checkedKeys =>{
    // this.setState({personCheckedKeys:checkedKeys})
    if(checkedKeys.length==1) {
      let uid = checkedKeys[0].split('-')[1];
      // console.log('uid',uid);
      this.fetchPersonCaseData(uid);
      this.fetchAllCase(uid);
    }else if(checkedKeys.length>1) {
      message.warning("请只勾选一个人员");
    }
  }

  //渲染机构树
  renderTreeNodes = data => {
    if (data) {
      // console.log("data", data ,data.length);
      return data.map(item => {
        if (item.beInstitutions.length!=0) {
          // console.log('111111',item);
          return (
            <TreeNode disableCheckbox title={item.name} key={item.id} dataRef={item}>
              {this.renderTreeNodes(item.beInstitutions)}
            </TreeNode>
          );
        }else if(item.users.length!=0){
          // console.log('11111111111111111111')
          // console.log('11',item);
          return (
            <TreeNode disableCheckbox title={item.name} key={item.id} dataRef={item}>
              {this.renderTreePersonNodes(item.users)}
            </TreeNode>
          ); 
        }
        return (
          <TreeNode
            disableCheckbox
            title={item.name}
            key={item.id}
          />
        );
      });
    }
  };

  // 渲染人的树
  renderTreePersonNodes = data =>{
    // console.log('item',data);
    return data.map((item)=>{
      let personId = "person-" + item.uid;
      return (    
         <TreeNode
          // disableCheckbox={this.state.flag}
          // selectable={this.state.seletFlag}
          title={item.userName}
          key={personId}
          onCheck={this.onPersonCheck}
      />)
    })
 
    ;
  }

  //渲染关联的所有柜子树
  renderTreeNodes2 = data => {
    // console.log('data',data);
    return data.map(item => {
      if (item.cases) {
        if(item.cases.length){
          return (
            <TreeNode title={item.warehouseName} key={item.warehouseId} dataRef={item}>
              {this.renderTreeNodes2(item.cases)}
            </TreeNode>
          );
        }else if(item.cases.length==0) {
          return <TreeNode title={item.warehouseName} key={item.warehouseId} />
      }
    }
      return <TreeNode title={item.caseName} key={"case-"+item.caseId} />;
    });
  };

  showModal = () => {
    this.setState({ visible: true });
  };
  handleOk = e => {
    // console.log(e);

    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
  };

  onSubmit = ()=>{
    console.log("提交了");
  }

  render() {
    const user = {
      message: "",
      data: {
        uid: 2,
        userName: "wujian",
        telephone: "15200429735",
        registrationtime: 1551855705000,
        status: 1,
        password: null,
        beDepartment: {
          id: 2,
          name: "财务部"
        },
        beInstitution: {
          id: 5,
          lever: 3,
          name: "小阳街道",
          beInstitutions: null
        },
        role: "加盟商",
        permissions: [
          "专题管理",
          "banner管理",
          "信息管理",
          "积分管理",
          "库存查询",
          "出库单"
        ],
        roleType: 1
      },
      session: "97A7BE6785BA1CCB802970F326C5601E",
      fetching: false
    };
    // const { user } = this.props;
    let data = user.data;

    // let permissions = data.permissions.toString();
    let userName = data.userName;
    let department = data.beInstitution.name || "无";
    let role = data.role;
    let resDOM = this.state.treePersonCase.length!=0?this.state.treePersonCase.map((v, k) => {
      return (
        <div className="datauth-flexbox" key={k}>
          <div className="left">{v.warehouseName}</div>
          <div className="right">
            {v.cases.map((value, k) => {
              return (
                <div key={k} className="caseinfo">
                  {value.caseName}
                </div>
              );
            })}
          </div>
        </div>
      );
    }):null;

    return (
      <div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tree
            checkable
            checkStrictly
            checkedKeys={this.state.caseCheckedKeys}
            onCheck={this.onCheck}
          >
            {this.renderTreeNodes2(this.state.treeAllcase)}
          </Tree>
        </Modal>

        <Card>
          我是数据权限
          <Divider />
          <Tree
            checkable
            onCheck={this.onPersonCheck}
            >
            {this.renderTreeNodes(this.state.treeImple)}
          </Tree>
        </Card>
        <Card>
          <div className="data-content">
            <div className="onerow">
              {userName},{department},角色：{role}
            </div>
            <div>
              关联：<Button onClick={this.showModal}>选择</Button>
            </div>
            <Divider />
            <div className="dataauth-box">
              <div className="headerow" style={{ marginRight: 500 }}>
                <span>仓库</span>
              </div>
              <div className="headerow">
                <span>柜子</span>
              </div>
              {resDOM}
            </div>
          </div>
          <div style={{margin:50}}><Button onClick={this.onSubmit}type="primary">保存</Button></div>
        </Card>
      </div>
    );
  }
}

const mapStateToPorps = state => ({
  user: state.getIn(["login", "user"])
});

export default connect(
  mapStateToPorps,
  null
)(DataAuth);
