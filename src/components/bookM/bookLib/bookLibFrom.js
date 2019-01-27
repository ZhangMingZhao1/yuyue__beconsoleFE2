import React from 'react';
import { Form, Select, Input, Button, Row, Col, DatePicker, InputNumber, Upload, Icon } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const BookLibForm = Form.create()(
    class extends React.Component {
        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 1, label: '名称', name: 'name', width: '300px', },
                { type: 1, label: 'ISBN', name: 'isbn', width: '300px', },
                { type: 2, label: '出版社', name: 'publish', width: '100px', value: ['新华出版社', '1', '2'] },
                { type: 2, label: '分类', name: 'category', width: '100px', value: ['儿童', '1', '2'] },
                { type: 1, label: '作者', name: 'author', width: '300px' },
                { type: 2, label: '是否精选', name: 'isSelected', width: '100px', value: ['是', '否'] },
                { type: 3, label: '印刷时间', name: 'printTime', },
                { type: 3, label: '出版时间', name: 'publishTime', },
                { type: 4, label: '页数', name: 'pages', width: '100px', extra: '页' },
                { type: 1, label: '规格', name: 'standard', width: '300px' },
                { type: 1, label: '版次', name: 'edition', width: '300px' },
                { type: 1, label: '印次', name: 'printNum', width: '300px' },
                { type: 4, label: '价格', name: 'price', width: '100px', extra: '元' },
                { type: 4, label: '评分', name: 'score', min: 0, max: 5, width: '100px', help: '(0-5分)' },
                { type: 4, label: '浏览次数', name: 'viewNum', width: '100px' },
                { type: 4, label: '搜索次数', name: 'searchNum', width: '100px' },
                { type: 4, label: '重量', name: 'weight', width: '100px', extra: 'Kg' },
                { type: 1, label: '中图分类', name: 'clc', width: '100px', extra: '元' },
                { type: 5, label: '缩略图', name: 'thumbnail', width: '100px', extra: '元', help: '建议204*262像支持jpg,png格式' },
                { type: 5, label: '童书简图', name: 'childPic', width: '100px', extra: '元', help: '建议330*250像支持jpg,png格式' }
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
                                            return <DatePicker />
                                        case 4:
                                            return <span>
                                                <InputNumber min={i.min} max={i.max} />
                                                <span style={{ marginLeft: 10 }}>{i.extra}</span>
                                            </span>
                                        case 5:
                                            return <Upload name="file" action="" listType="picture">
                                                <Button>
                                                    <Icon type="upload" /> Click to upload
                                        </Button>
                                            </Upload>
                                        default:
                                            return null
                                    }
                                })())}
                            </Form.Item>
                        </Col>
                    ))}
                    <Col span={24}>
                        <Form.Item label='简介'>
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
export default BookLibForm;