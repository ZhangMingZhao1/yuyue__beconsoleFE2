import React from 'react';
import { Row, Col, Form, Button, Input, InputNumber, Select } from 'antd';

const TextArea = Input.TextArea;
const Option = Select.Option;
const StaffForm = Form.create()(
    class extends React.Component {
        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 1, label: '员工姓名*', name: 'name', width: '300px', },
                { type: 4, label: '登录密码', name: 'password', width: '300px', },
                { type: 2, label: '状态', name: 'status', width: '300px', value: ['正常', '停用'] },
                { type: 2, label: '角色', name: 'character', width: '300px', value: ['管理员', '审稿员'] },
                { type: 3, label: '手机号*', name: 'phoneNumber', width: '300px', },
                { type: 5, label: '注册时间', name: 'time', width: '300px', value: '2017-05-11 15:11:00' },
                { type: 2, label: '所属机构', name: 'org', width: '500px', value: ['朝阳街道', '1', '2'] },
                { type: 2, label: '所属部门', name: 'department', width: '500px', value: ['运维部', '技术部'] },
            ];
            return (
                <Form onSubmit={(e) => { this.props.onSubmit(e) }}><Row>
                    {formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12}>
                            <Form.Item {...formItemLayout} label={i.label} help={i.help}>
                                {getFieldDecorator(i.name, { initialValue: initial ? initial[i.name] : null })((() => {
                                    switch (i.type) {
                                        case 1:
                                            return <span>
                                                <Input style={{ width: `${i.width}` }} />
                                                <span style={{ marginLeft: 10 }}>{i.extra}</span>
                                            </span>
                                        case 2:
                                            return <Select style={{ width: `${i.width}` }}>
                                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                                            </Select>
                                        case 3:
                                            return <span>
                                                <InputNumber min={i.min} max={i.max} />
                                                <span style={{ marginLeft: 10 }}>{i.extra}</span>
                                            </span>
                                        case 4:
                                            return <span>
                                                <Input type="password" style={{ width: `${i.width}` }} />
                                            </span>
                                        case 5:
                                        return <div>
                                            {i.value}
                                        </div>
                                        default:
                                            return null
                                    }
                                })())}
                            </Form.Item>
                        </Col>
                    ))}
                    <Col span={24}>
                        <Form.Item label='备注'>
                            {getFieldDecorator('brief', { initialValue: initial ? initial['brief'] : null })(
                                <TextArea rows={3} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                    <Row hidden={this.props.type == 'modify' ? false : true}>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="创建时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['createTime'] : null}</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="最近修改时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['modifyTime'] : null}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType='submit'>提交</Button>
                        <Button type="primary" onClick={() => { this.props.onCancel() }}>取消</Button>
                    </div>
                </Form>
            );
        }
    }
);

export default StaffForm;
