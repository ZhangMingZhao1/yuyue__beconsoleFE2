import React, { Component } from 'react';
import {Table,Divider,Card,Button} from 'antd';

class FranRank extends Component {
    constructor(props) {
      super(props)
      this.state = {
         tableData : [],
      }
    }
    fetchTableData=()=> {
        fetch('http://localhost:8080/yuyue/franrank',{
            method:"GET",
            mode:"cors",
            credentials:'include'
        })
            .then((res)=>res.json())
            .then((data)=>{
                if(data) {
                    console.log('1111112222'+data);
                    this.setState({tableData:data});
                }
            
            })
    }
    componentDidMount() {
        this.fetchTableData();
    }
    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'nd',
          }, {
            title: '等级名称',
            dataIndex: 'rank_name',
            key: 'rank_name',
          }, {
            title: '购书折扣',
            dataIndex: 'discount',
            key: 'discount',
          }, {
            title: '分成比例',
            key: 'dividend',
            dataIndex: 'dividend',
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;">修改</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
              </span>
            ),
          }];

        return (
            <div>
                 
                <Card>
                    <Button type="primary">新建</Button>
                    <Table dataSource={this.state.tableData} columns={columns} />
                </Card>
            </div>
        )
    }
    
}

export default FranRank;