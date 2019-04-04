import React from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';

const { FormItem } = Form;
const { RangePicker } = DatePicker;
const { Option } = Select;

const InvCodeForm = Form.create()(
    class extends React.Component {

        render() {

            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 1, label: '大客户编号', name: 'customerId', width: '150px' },
                { type: 2, label: '名称', name: 'customerName', width: '300px' },
                { type: 2, label: '邀请码', name: 'invCDKey', width: '300px' },
                { type: 3, label: '有效期', name: 'timeRange', width: '300px' },
                { type: 1, label: '有效人数', name: 'effNum', width: '150px' },
                { type: 4, label: '邀请码状态', name: 'state', width: '150px', value: ['启用', '禁用'] },
            ];
            return (
                <Form onSubmit={(e) => { this.props.onSubmit(e) }}>
                    <Row>
                        {
                            formItem.map((i) => (
                                <Col key={i.name} span={i.span ? i.span : 12}>
                                    <FormItem {...formItemLayout} label={i.label} help={i.help}>
                                        {getFieldDecorator(i.name, { initialValue: initial ? initial[i.name] : null })((() => {
                                            console.log(i.name)
                                            switch (i.type) {
                                                case 1:
                                                    return <span>
                                                        <Input
                                                            type="number"
                                                            value={initial ? initial[i.name] : null}
                                                            style={{ width: `${i.width}` }}
                                                        />
                                                    </span>
                                                case 2:
                                                    return <span>
                                                        <Input
                                                            value={initial ? initial[i.name] : null}
                                                            style={{ width: `${i.width}` }}
                                                        />
                                                    </span>
                                                case 3:
                                                    return <span>
                                                        <RangePicker
                                                            value={initial ? initial[i.name] : null}
                                                            style={{ width: `${i.width}` }}
                                                        />
                                                    </span>
                                                case 4:
                                                    return <span>
                                                        <Select
                                                            value={initial ? initial[i.name] : null}
                                                            style={{ width: `${i.width}` }}
                                                        >
                                                            {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                                                        </Select>
                                                    </span>
                                                default:
                                                    return null
                                            }
                                        })())}
                                    </FormItem>
                                </Col>
                            ))
                        }
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

export default InvCodeForm;
