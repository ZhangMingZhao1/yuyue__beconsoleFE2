import React, { Component } from 'react';
import {Card,Row,Col,Divider,Form, Select,Input,Button,message} from 'antd' ;

const { Option } = Select;

class AddFranInfo extends Component{
    constructor(props) {
        super(props)
      
        this.state = {
           
        };
    };
    componentDidMount() {
     

    }
    handleAddFranInfo = (data)=>{
        let options = {
            method:"POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify(data)
        }
        fetch(`http://localhost:8080/yuyue/addfraninfo/${localStorage.getItem("user")}`,options)
            .then(res=>res.json())
            .then(data=>{
                console.log('dataaddFranInfo ',data);
                if(data===true)
                    message.success('新增成功');
                    // console.log("this.props",this.props);
                    //在<Route>组件的下一级使用是没问题的，但是在孙子组件，或者redux里面是没法使用的
                    this.props.history.push("/app/franchiseeM/info")
            })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('修改1111', values);
              this.handleAddFranInfo(values);
            }
          });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let resDom = [];
        
        return (
            <Card>
                <Row type="flex" justify="center">
                    <Col>修改加盟商</Col>
                </Row> 
                <Divider></Divider>
                <Row>
                    <Col>编号:{}</Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={48}>
                      <Col span={5}>
                        <Form.Item
                            label="名称"
                            >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                      </Col> 
                      <Col span={5}>
                        <Form.Item
                            label="等级"
                            >
                            {getFieldDecorator('rank', {
                                rules: [{ required: true, message: '' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                      </Col>  
                      <Col span={5}>
                        <Form.Item
                            label="状态"
                            >
                            {getFieldDecorator('state', {
                                rules: [{  required: true,message: '' }],
                                initialValue:"正常"
                            })(
                                <Select>
                                    <Option value="正常">正常</Option>
                                    <Option value="禁用">禁用</Option>
                                </Select>
                            )}
                        </Form.Item>
                      </Col>   
                    </Row>
                    <Row gutter={48}>
                        <Col span={5}>
                            <Form.Item
                                label="类型"
                                >
                                {getFieldDecorator('type', {
                                    rules: [{  required: true,message: '' }],
                                    initialValue:"企业"
                                })(
                                    <Select>
                                        <Option value="企业">企业</Option>
                                        <Option value="个人">个人</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col> 
                        <Col span={5}>
                            <Form.Item
                                label="证照类型"
                                >
                                {getFieldDecorator('id_type', {
                                    rules: [{  required: true,message: '' }],
                                    initialValue:"营业执照"
                                })(
                                    <Select>
                                        <Option value="营业执照">营业执照</Option>
                                        <Option value="无">无</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>  
                        <Col span={5}>
                            <Form.Item
                                label="证照号码"
                                >
                                {getFieldDecorator('id_number', {
                                    rules: [{  required: true,message: '' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>     
                    </Row>

                    <Row gutter={48}> 
                        <Col span={20}>
                            <Form.Item
                                label="注册地址"
                                >
                                {getFieldDecorator('resginster_address', {
                                    rules: [{ required: true, message: '' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col> 
                    </Row>

                    <Row gutter={48}> 
                        <Col span={20}>
                            <Form.Item
                                label="通讯地址"
                                >
                                {getFieldDecorator('commu_address', {
                                    rules: [{  required: true,message: '' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col> 
                    </Row>

                    <Row gutter={48}>
                        <Col span={5}>
                                <Form.Item
                                    label="法人"
                                    >
                                    {getFieldDecorator('legal_person', {
                                        rules: [{  required: true,message: '' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col> 
                            <Col span={5}>
                                <Form.Item
                                    label="电话"
                                    >
                                    {getFieldDecorator('legal_person_phone', {
                                        rules: [{ required: true, message: '' }],
                                    })(
                                       <Input />
                                    )}
                                </Form.Item>
                            </Col>  
                            <Col span={5}>
                                <Form.Item
                                    label="邮箱"
                                    >
                                    {getFieldDecorator('legal_person_mailbox', {
                                        rules: [{ required: true, message: '' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>       
                    </Row>
                    <Row gutter={48}> 
                        <Col span={5}>
                            <Form.Item
                                label="联系人"
                                >
                                {getFieldDecorator('contact_name', {
                                    rules: [{  required: true,message: '' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col> 
                        <Col span={5}>
                            <Form.Item
                                label="电话"
                                >
                                {getFieldDecorator('contact_phone', {
                                    rules: [{  required: true,message: '' }],
                                })(
                                <Input />
                                )}
                            </Form.Item>
                        </Col>  
                        <Col span={5}>
                            <Form.Item
                                label="邮箱"
                                >
                                {getFieldDecorator('contact_mailbox', {
                                    rules: [{  required: true,message: '' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>  
                    </Row>
                    <Row gutter={48}>
                        <Col span={8}>
                            <Form.Item
                                label="账户名"
                                >
                                {getFieldDecorator('account_name', {
                                    rules: [{  required: true,message: '' }],
                                })(
                                <Input />
                                )}
                            </Form.Item>
                        </Col>  
                        <Col span={8}>
                            <Form.Item
                                label="账号"
                                >
                                {getFieldDecorator('account_number', {
                                    rules: [{ required: true, message: '' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>  
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="开户行"
                                >
                                {getFieldDecorator('bank', {
                                    rules: [{ required: true, message: '' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>  
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="备注"
                                >
                                {getFieldDecorator('remark', {
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

export default AddFranInfo=Form.create()(AddFranInfo);