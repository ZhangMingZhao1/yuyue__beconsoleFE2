import React, { Component } from 'react';
import {Card,Row,Col,Divider,Form, Select,Input,Button} from 'antd' ;

const { Option } = Select;

class FranModify extends Component{
    constructor(props) {
        super(props)
      
        this.state = {
           
        };
    };
    componentDidMount() {
     

    }
    handleFranModifyData = ()=>{
        let id = this.props.match.params.id;
        fetch(`http://localhost:8080/yuyue/modifyfran/${id}`)
            .then()
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('修改1111', values);
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
                                    initialValue:"yingyezhizhao"
                                })(
                                    <Select>
                                        <Option value="yingyezhizhao">营业执照</Option>
                                        <Option value="wu">无</Option>
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

export default FranModify=Form.create()(FranModify);