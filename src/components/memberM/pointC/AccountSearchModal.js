import React from 'react';
import { getFormItem } from '../../baseFormItem';
import { Button, Form, Modal, Row, Col, message } from 'antd';
import Url from '../../../api/config';

/**
 * 会员账号搜索弹框
 */
const AccountSearchModal = Form.create({ name: 'account_search_form' })(
    class extends React.Component {
        state = {}
        handleNext = () => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.setState({ loading: true })
                    //获取账号信息
                    fetch(`${Url}/vip/userinfos/${values.account}`, { credentials: 'include' })
                        .then((res) => res.json()).then(result => {
                            if (result.code !== 1) {
                                let data = result;
                                this.setState({ loading: false }, () => {
                                    this.props.onNext(data);
                                    this.props.form.resetFields(); //重置表单
                                })
                            } else {
                                this.setState({ loading: false }, () => { message.error(result.message) })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                }
            })
        }
        render() {
            const { visible, onCancel, form } = this.props;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
            const formList = [{
                type: 'INPUT', label: '会员账号', name: 'account', formItemLayout: formItemLayout, rules: [
                    { required: true, message: '请输入会员账号!' },
                ],
            }];
            return (
                <Modal
                    visible={visible}
                    onCancel={() => { this.props.form.resetFields(); onCancel(); }}//重置表单
                    footer={<p style={{ textAlign: 'center' }}>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleNext}>下一步</Button>
                    </p>}
                >
                    <Form >
                        <Row>
                            {getFormItem(form, formList).map((item, index) => (
                                <Col key={index}>
                                    {item}
                                </Col>
                            ))}
                        </Row>
                    </Form>
                </Modal>
            );
        }
    }
);

export default AccountSearchModal;
