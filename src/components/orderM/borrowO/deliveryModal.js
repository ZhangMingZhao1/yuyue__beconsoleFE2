import React from 'react';
import { Modal, Row, Col, Card, Select, Form, Input, Button } from 'antd';
const { Option } = Select;

const layout1 = { labelCol: { span: 8 }, wrapperCol: { span: 14 } };
const layout2 = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
const postFormItem = [
    { type: 1, label: '收件人', name: 'recipient', formItemLayout: layout1, span: 12 },
    { type: 1, label: '收件人电话', name: 'recipient_tel', formItemLayout: layout1, span: 12 },
    { type: 1, label: '收件地址', name: 'receive_addr', formItemLayout: layout2, span: 24 },
    { type: 2, label: '快递公司 ', name: 'express_company', formItemLayout: layout1, span: 12, value: ['顺丰快递'] },
    { type: 1, label: '快递编号', name: 'express_code', formItemLayout: layout1, span: 12 },
    { type: 1, label: '快递费', name: 'express_fee', disabled: true, formItemLayout: layout1, span: 12 },
    { type: 1, label: '快递费状态', name: 'fee_state', disabled: true, formItemLayout: layout1, span: 12 },
    { type: 1, label: '电子标签', name: 'tag', formItemLayout: layout2, span: 24 },
];
const caseFormItem = [
    { type: 1, label: '书柜名称', name: 'case_name', disabled: true, formItemLayout: layout1, span: 12 },
    { type: 1, label: '书柜编号', name: 'case_code', disabled: true, formItemLayout: layout1, span: 12 },
    { type: 2, label: '格子编号', name: 'cell_code', formItemLayout: layout1, span: 12, value: [] },
    { type: 2, label: '运维人 ', name: 'operator', formItemLayout: layout1, span: 12, value: ['王五'] },
    { type: 1, label: '电子标签', name: 'tag', formItemLayout: layout2, span: 24 },
];

const DeliveryForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formItem: [],
            }
        }
        componentDidMount() {
            console.log(this.props.delivery);
            this.props.delivery === 'post' ?
                this.setState({ formItem: postFormItem }) : this.setState({ formItem: caseFormItem });
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form onSubmit={(e) => { }}><Row>
                    {this.state.formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12}>
                            <Form.Item {...i.formItemLayout} label={i.label}>
                                {getFieldDecorator(i.name)((() => {
                                    switch (i.type) {
                                        case 1:
                                            return <Input style={{ border: `${i.disabled ? 'none' : ''}` }} disabled={i.disabled ? i.disabled : false} />
                                        case 2:
                                            return <Select>
                                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                                            </Select>
                                        default:
                                            return null
                                    }
                                })())}
                            </Form.Item>
                        </Col>))}
                </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType='submit' onClick={() => { this.props.onSave() }}>保存</Button>
                        <Button onClick={() => { this.props.onConfirm() }}>确定发货</Button>
                    </div>
                </Form>
            );
        }
    }
);
const baseInfo = [
    { label: '订单ID', name: 'order_id' },
    { label: '创建时间', name: 'create_time' },
    { label: '会员账号', name: 'account' },
    { label: '进度', name: 'progress' },
    { label: '书籍名称', name: 'book_name' },
    { label: 'ISBN', name: 'isbn' },
    { label: '货位', name: 'goods_pos' },
];


class DeliveryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            }
        }
    }

    render() {
        const { visible, onCancel, onSave, onConfirm, type } = this.props;
        const { data } = this.state;
        return (
            <div className="">
                <Modal
                    title={type === 'post' ? '发快递' : '发书柜'}
                    visible={visible}
                    onCancel={() => { onCancel() }}
                    footer={null}
                >
                    <Card><Row>
                        {baseInfo.map(i => (
                            <Col key={i.name} style={{ lineHeight: '30px' }} span={12}>
                                <span style={{ fontWeight: "bold" }}>{i.label}:</span>
                                <span style={{ paddingLeft: 8 }}>{data[i.name]}</span>
                            </Col>)
                        )}
                    </Row></Card>
                    <DeliveryForm
                        delivery={type}
                        onSave={onSave}
                        onConfirm={onConfirm}
                    />
                </Modal>
            </div>

        )
    }
}

export default DeliveryModal;