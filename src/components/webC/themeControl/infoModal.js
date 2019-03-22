
import React from 'react';
import { Input, Form, Modal, Row, Col } from 'antd';
import './index.less';
import { getFormItem } from '../../baseFormItem';

const ThemeInfoForm = Form.create()(
    class extends React.Component {
        render() {
            const { form } = this.props;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
            const formList = [
                { type: 'INPUT', label: '名称', name: 'subjectName', formItemLayout },
                { type: 'SWITCH', label: '状态', name: 'isShow', width: '100px', initialValue: false, formItemLayout },
                { type: 'INPUTNUMBER', label: '排序', name: 'sort', width: '100px', formItemLayout },
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


class ThemeInfoModal extends React.Component {
    onOk=()=>{
        let form = this.ref.props.form;
        form.validateFields((err,values)=>{
            if(!err){
                this.props.onOk(form);
            }
        })
    }
    onCancel=()=>{
        this.props.onCancel(this.ref.props.form);
    }
    render() {
        return (
            <Modal
                title={this.props.type==='add'? "新增专题":"修改专题"}
                visible={this.props.visible}
                okText="提交"
                cancelText="取消"
                onOk={this.onOk}
                onCancel={this.onCancel}
            >
                <ThemeInfoForm wrappedComponentRef={(ref)=>{this.ref = ref}}/>
            </Modal>

        )
    }
}
export default ThemeInfoModal;