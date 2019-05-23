import React from 'react';
import { getFormItem } from '../../baseFormItem';
import { Button, Form, Modal, Row, Col, message } from 'antd';
import { typeConfig } from './pointC';

/**
 * 变更积分弹框
 */
const PointAlterModal = Form.create({ name: 'point_alter_form' })(
    class extends React.Component {
        handleSubmit = () => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let dataSource = this.props.dataSource;
                    //减为负数
                    if (values.type === "1" && (dataSource.point - dataSource.freezePoint - values.credit) < 0) {
                        message.error("减少不可扣成负数!");
                        return ;
                    }
                    //冻结积分大于余额
                    if (values.type === "2" && (dataSource.freezePoint + values.credit > dataSource.point)) {
                        message.error("冻结积分不可大于余额!");
                        return ;
                    }
                    let data = {
                        ...values,
                        userId: this.props.dataSource.userId,
                    }
                    this.props.onSubmit(data);
                    this.props.form.resetFields(); //重置表单
                }
            })
        }
        render() {
            const { visible, onCancel, dataSource, form } = this.props;
            const formItemLayout = {
                labelCol: { span: 10 },
                wrapperCol: { span: 12 },
            };
            const title = [
                <Row key="titleR1" style={{ lineHeight: 2 }}><Col span={12}>会员账号：{dataSource.mobilePhone}</Col><Col span={12}>昵称：{dataSource.nickname}</Col></Row>,
                <Row key="titleR2" style={{ lineHeight: 2 }}><Col span={12}>积分余额：{dataSource.point}</Col><Col span={12}>冻结积分：{dataSource.freezePoint}</Col></Row>
            ];
            const typeList = [];
            for (let val in typeConfig) {
                typeList.push({ id: val, name: typeConfig[val] })
            }
            let formList = [
                { type: 'SELECT', label: '类型', name: 'type', width: '100px', list: typeList },
                {
                    type: 'INPUTNUMBER', label: '积分', name: 'credit', rules: [
                        { required: true, message: '积分不为空且为数字！', type: 'number' }
                    ]
                },
            ].map(i => { i.formItemLayout = formItemLayout; return i; });
            return (
                <Modal
                    visible={visible}
                    onCancel={() => { form.resetFields(); onCancel(); }}
                    footer={null}
                    title={title}
                >
                    <Form layout="horizontal">
                        {getFormItem(form, formList)}
                        <Form.Item>
                            <p style={{ textAlign: 'center' }}><Button type="primary" onClick={this.handleSubmit}>确定</Button></p>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default PointAlterModal;