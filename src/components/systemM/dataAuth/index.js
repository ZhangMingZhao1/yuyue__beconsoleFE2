import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tree, Card, Divider, Modal, Button, message} from "antd";
import URL from "../../../api/config";
// import { connect } from "react-redux";
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
    checkedKeys: [],
    person:{},
    uid:null,
    flag:true,
    // flag:false,
    // seletFlag:false,
  };



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

  //获取某个人的信息

  fetchPersonData =(uid)=>{
    fetch(`${URL}/system/users/${uid}`,{credentials:"include"})
      .then(res=>res.json())
      .then(data=>{
        this.setState({person:data});
      })
  }
  //获取要关联的全部柜子信息
  fetchAllCase = uid => {
    fetch(`${URL}/system/warehousecases/${uid}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        // console.log('ddddd',data.array.map((v)=>"case-"+v));
        this.setState({caseCheckedKeys:data.array.map((v)=>"case-"+v),treeAllcase:data.datas,before:data.array});
      });
  };

  //勾选机构树的人
  onPersonCheck = checkedKeys =>{
    // this.setState({personCheckedKeys:checkedKeys})
    if(checkedKeys.length==1) {
      let uid = checkedKeys[0].split('-')[1];
      // console.log('uid',uid);
      this.setState({uid:uid,flag:false});
      this.fetchPersonData(uid);
      this.fetchPersonCaseData(uid);
      this.fetchAllCase(uid);
    }else if(checkedKeys.length>1) {
      message.warning("请只勾选一个人员");
    }else if(checkedKeys.length<1) {
      this.setState({flag:true});
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

  updatePersonCaseData = (userId,deleteCaseIds,addCaseIds)=>{
    // console.log(JSON.stringify({
    //   "userId":userId,
    //   "deleteCaseIds":deleteCaseIds,
    //   "addCaseIds":addCaseIds,
    // }));
    fetch(`${URL}/system/warehousecases`,{
      credentials:"include",
      method:"POST",
      headers: {
				'Content-Type': 'application/json'
			},
      body:JSON.stringify({
        "userId":userId,
        "deleteCaseIds":deleteCaseIds,
        "addCaseIds":addCaseIds,
      })
    })
      .then(res=>res.json())
      .then(data=>{
        // console.log('保存的返回',data);
        if(data.code==0){
          this.fetchPersonCaseData(userId);
          message.success("保存成功")
        }else {
          message.error("保存失败，联系开发人员")
        }
       
      })
  }
  componentDidMount() {
    this.fetchInpleData();
    
  }
  handleOk = e => {
    // console.log(e);
    // console.log('caseCheckedKeys',this.state.caseCheckedKeys,this.state.caseCheckedKeys.map((v)=>v.split('-')[1]))
    let DelArray = this.diffDel(this.state.before,this.state.caseCheckedKeys.map((v)=>v.split('-')[1]-0));
    // console.log('DelArray',DelArray);
    let AddArray = this.diffAdd(this.state.before,this.state.caseCheckedKeys.map((v)=>v.split('-')[1]-0));
    // console.log('AddArray',AddArray);
    this.updatePersonCaseData(this.state.uid-0,DelArray,AddArray);
    this.setState({
      visible: false
    });
    
  };

  onCheck =(checkedKeys)=>{
    // console.log('before',this.state.before);
    // console.log('checkedKeys',checkedKeys);
    // console.log('caseCheckedKeys',this.state.caseCheckedKeys);
    this.setState({ caseCheckedKeys:checkedKeys.checked});
    // console.log(this.state.caseCheckedKeys);
  }

  //返回删除的caseID数组
  diffDel = (arr1,arr2)=> {
    let tmp = [];
    for(let i = 0; i <arr1.length; i++ ) {
        if(arr2.indexOf(arr1[i])==-1) {
          tmp.push(arr1[i]);
        }
    }
    return tmp;
  }
  //返回新增的caseID数组
  diffAdd =(arr1,arr2)=>{
    let tmp = [];
    for(let i = 0; i <arr2.length; i++ ) {
      console.log(arr2[i]);
      if(arr1.indexOf(arr2[i])==-1) {
        tmp.push(arr2[i]);
    }
  }
    return tmp;
  }

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

    // const { user } = this.props;
    let data = this.state.person;
    console.log('data',data);
    // let permissions = data.permissions.toString();
    let userName = (!!data)?data.userName:null;
    let beInstitution = (!!data.beInstitution)?data.beInstitution.name:null;
    let role = (!!data)?data.role:null;
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
          okText="保存"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // defaultExpandParent
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
           <div className="topTips">数据权限页面提示： {this.state.flag&&"请在下方的机构树里选择一个人员"}</div>
             
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
              选择的人为：{userName},{beInstitution},该角色为：{role}
            </div>
            <div>
              关联：<Button type="primary" onClick={this.showModal}>选择</Button>
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
          {/* <div style={{margin:50}}><Button onClick={this.onSubmit}type="primary">保存</Button></div> */}
        </Card>
      </div>
    );
  }
}

// const mapStateToPorps = state => ({
//   user: state.getIn(["login", "user"])
// });
export default DataAuth;
// export default connect(
//   mapStateToPorps,
//   null
// )(DataAuth);
