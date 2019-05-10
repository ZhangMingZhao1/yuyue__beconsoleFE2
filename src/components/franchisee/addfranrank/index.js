import React, { Component } from 'react';
import {Card,Row,Col,Divider,Form, Select,Input,Button,message} from 'antd' ;

const { Option } = Select;

class AddFranRank extends Component{
    constructor(props) {
        super(props)
      
        this.state = {
           
        };
    };
    componentDidMount() {
     

    }
    handleAddFranRank = (data)=>{
        let options = {
            method:"POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify(data)
        }
        fetch(`http://localhost:8080/yuyue/addfranrank`,options)
            .then(res=>res.json())
            .then(data=>{
                console.log('dataaddFranRank ',data);
                if(data===true) {
                    message.success('新增等级成功');
                    // console.log("this.props",this.props);
                    //在<Route>组件的下一级使用是没问题的，但是在孙子组件，或者redux里面是没法使用的
                    this.props.history.push("/app/franchiseeM/level")
                }else {
                    message.error("新增失败")
                }
            })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            //   console.log('增加', values);
              this.handleAddFranRank(values);
            }
          });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let resDom = [];
        
        return (
            <Card>
                <Row type="flex" justify="center">
                    <Col>增加加盟商等级</Col>
                </Row> 
                <Divider></Divider>
                    <Form onSubmit={this.handleSubmit}> 
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    label="等级名称"
                                    >
                                    {getFieldDecorator('rank_name', {
                                        rules: [{  required: true,message: '' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col> 
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    label="购书折扣"
                                    >
                                    {getFieldDecorator('discount', {
                                        rules: [{  required: true,message: '' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col> 
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    label="分成比例"
                                    >
                                    {getFieldDecorator('dividend', {
                                        rules: [{  required: true,message: '' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col> 
                        </Row>
                        <Row>
                                <Form.Item
                                    wrapperCol={{ span: 12}}
                                    >
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                        </Row>   
                </Form>

            </Card>
        )
    }
}

export default AddFranRank=Form.create()(AddFranRank);