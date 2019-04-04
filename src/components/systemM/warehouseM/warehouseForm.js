import React from 'react';
import { Row, Col, Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

const TextArea = Input.TextArea;
const Option = Select.Option;
const WarehouseForm = Form.create()(
    class extends React.Component {

        onSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 3, label: '仓库编号', name: 'warehouseId', width: '150px' },
                { type: 1, label: '仓库名称', name: 'warehouseName', width: '300px', },
                { type: 2, label: '所属部门', name: 'departmentId', width: '150px', value: ['运维部', '财务部', '产品部'] },
                { type: 1, label: '联系人', name: 'contacts', width: '150px' },
                { type: 3, label: '联系方式', name: 'telephone', width: '150px' },
                { type: 1, label: '地址', name: 'warehouseAddress', width: '300px' },
                { type: 1, label: '操作员', name: 'operatorId', width: '150px' },
            ];
            return (
                <Form onSubmit={this.onSubmit}><Row>
                    {formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12}>
                            <Form.Item {...formItemLayout} label={i.label} help={i.help}>
                                {getFieldDecorator(i.name, {
                                    initialValue: initial ? initial[i.name] : null,
                                    rules: [
                                        {
                                            required: i.name === 'warehouseId' ? true : false,
                                            message: '仓库编号不能为空'
                                        },
                                        {
                                            pattern: i.name === 'warehouseId' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        },
                                        {
                                            pattern: i.name === 'telephone' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        }
                                    ]
                                })((() => {
                                    switch (i.type) {
                                        case 1:
                                            return <span>
                                                <Input defaultValue={initial ? initial[i.name] : null} style={{ width: `${i.width}` }} />
                                            </span>
                                        case 2:
                                            return <Select style={{ width: `${i.width}` }}>
                                                {i.value.map((v, index) => (<Option key={index} value={`${index + 1}`}>{v}</Option>))}
                                            </Select>
                                        case 3:
                                            return <span>
                                                <Input defaultValue={initial ? initial[i.name] : null} style={{ width: `${i.width}` }} />
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
                            {getFieldDecorator('remark', { initialValue: initial ? initial['remarks'] : null })(
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
                                <span style={{ marginLeft: 10 }}>{initial ? initial['updateTime'] : null}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button type="primary"><Link to="/app/systemM/warehouseM">取消</Link></Button>
                    </div>
                </Form >
            );
        }
    }
);

export default WarehouseForm;
