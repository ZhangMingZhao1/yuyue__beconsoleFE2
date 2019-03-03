import React from 'react';
import { Row, Col, Form, Button, Input, Select } from 'antd';

const TextArea = Input.TextArea;
const Option = Select.Option;
const StaffForm = Form.create()(
    class extends React.Component {

        state = {
            value: ''
        }

        onChange = (e) => {
            const { value } = e.target;
            const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
            if ((!isNaN(value) && reg.test(value)) || value === '') {
                this.setState({
                    value: value
                });
            }
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 1, label: '员工姓名*', name: 'name', width: '150px', value: '' },
                { type: 4, label: '登录密码', name: 'password', width: '150px', },
                { type: 2, label: '状态', name: 'status', width: '150px', value: ['正常', '停用'] },
                { type: 2, label: '角色', name: 'character', width: '150px', value: ['管理员', '审稿员'] },
                { type: 3, label: '手机号*', name: 'phoneNumber', width: '250px', },
                { type: 5, label: '注册时间', name: 'time', width: '300px', value: '2017-05-11 15:11:00' },
                { type: 2, label: '所属机构', name: 'org', width: '150px', value: ['朝阳街道', '1', '2'] },
                { type: 2, label: '所属部门', name: 'department', width: '150px', value: ['运维部', '技术部'] },
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
                                                <Input value={initial ? initial.name : null} style={{ width: `${i.width}` }} />
                                            </span>
                                        case 2:
                                            return <Select style={{ width: `${i.width}` }}>
                                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                                            </Select>
                                        case 3:
                                            return <span>
                                                <Input value={this.state.value} style={{ width: `${i.width}` }} onChange={this.onChange} />
                                            </span>
                                        case 4:
                                            return <span>
                                                <Input type="password" style={{ width: `${i.width}` }} />
                                            </span>
                                        case 5:
                                            return <div style={{ width: `${i.width}` }}>
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
                        <Form.Item label="备注">
                            {getFieldDecorator('remark', { initialValue: initial ? initial['remark'] : null })(
                                <TextArea rows={3} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                    <Row hidden={this.props.type === 'change' ? false : true}>
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
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button type="primary" onClick={() => { this.props.onCancel() }}>取消</Button>
                    </div>
                </Form>
            );
        }
    }
);

export default StaffForm;
