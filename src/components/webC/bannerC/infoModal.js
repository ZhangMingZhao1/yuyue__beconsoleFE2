
import React from 'react';
import { Form, Modal, Row, Col } from 'antd';
import './index.less';
import { getFormItem } from '../../baseFormItem';

const BannerInfoForm = Form.create()(
    class extends React.Component {
        render() {
            const { form } = this.props;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
            const formList = [
                { type: 'INPUT', label: '名称', name: 'name', formItemLayout },
                { type: 'SWITCH', label: '状态', name: 'state', width: '100px', list: [], formItemLayout },
                { type: 'SELECT', label: '位置', name: 'location', width: '100px', list: [], formItemLayout },
                { type: 'INPUTNUMBER', label: '排序', name: 'index', width: '100px', formItemLayout },
                { type: 'UPLOAD', label: '图片', name: 'picture', width: '100px', formItemLayout },
            ];
            return (
                <Form >
                    <Row>
                        {getFormItem(form, formList).map((item, index) => (
                            <Col span={24} key={index}>
                                {item}
                            </Col>
                        ))}
                    </Row>
                </Form>
            );
        }
    }
);


class BannerInfoModal extends React.Component {
    render() {
        return (
            <Modal
                title={this.props.type==='add'? "新增banner":"修改banner"}
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
            >
                <BannerInfoForm />
            </Modal>

        )
    }
}
export default BannerInfoModal;