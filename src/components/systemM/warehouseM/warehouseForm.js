import React from 'react';
import { Row, Col, Form, Button, Input, Select } from 'antd';

const TextArea = Input.TextArea;
const Option = Select.Option;
const WarehouseForm = Form.create()(
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

        inputChange = (e) => {
            console.log(e.target.value);
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 3, label: '仓库编号', name: 'warehouseNumber', width: '150px' },
                { type: 1, label: '仓库名称', name: 'warehouseName', width: '300px', },
                { type: 2, label: '所属部门', name: 'department', width: '150px', value: ['运维部', '技术部'] },
                { type: 1, label: '联系人', name: 'people', width: '150px' },
                { type: 3, label: '联系方式', name: 'phoneNumber', width: '150px', },
                { type: 1, label: '地址', name: 'address', width: '300px' },
                { type: 1, label: '操作员', name: 'operator', width: '150px' },
            ];
            return (
                <Form onSubmit={(e) => { this.props.onSubmit(e) }}><Row>
                    {formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12}>
                            <Form.Item {...formItemLayout} label={i.label} help={i.help}>
                                {getFieldDecorator(i.name, { initialValue: initial ? initial[i.name] : null })((() => {
                                    console.log(i.name)
                                    switch (i.type) {
                                        case 1:
                                            return <span>
                                                <Input value={initial ? initial[i.name] : null} style={{ width: `${i.width}` }} onChange={this.inputChange} />
                                            </span>
                                        case 2:
                                            return <Select style={{ width: `${i.width}` }}>
                                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                                            </Select>
                                        case 3:
                                            return <span>
                                                <Input value={initial ? initial[i.name] : null} style={{ width: `${i.width}` }} onChange={this.onChange} />
                                            </span>
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
                                <span style={{ marginLeft: 10 }}>{initial ? initial['date'] : null}</span>
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

export default WarehouseForm;
