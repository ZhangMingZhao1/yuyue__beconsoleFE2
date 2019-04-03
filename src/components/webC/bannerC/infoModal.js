
import React from 'react';
import { Form, Modal, Row, Col, Upload, Icon, Button } from 'antd';
import './index.less';
import { getFormItem } from '../../baseFormItem';
import { typeConfig } from '.';

const BannerInfoForm = Form.create()(
    class extends React.Component {
        render() {
            const { form } = this.props;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
            let typeList = [];
            for(let val in typeConfig){
                typeList.push({id: val, name: typeConfig[val]})
            }
            const formList = [
                { type: 'INPUT', label: '名称', name: 'description', formItemLayout },
                { type: 'SWITCH', label: '状态', name: 'status', formItemLayout },
                { type: 'SELECT', label: '位置', name: 'type', width: '150px', list: typeList, formItemLayout },
                { type: 'INPUTNUMBER', label: '排序', name: 'sort', width: '100px', formItemLayout },
                { type: 'UPLOAD', label: '图片', name: 'image', width: '100px', formItemLayout },
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
    onOk=()=>{
        let form = this.ref.props.form;
        form.validateFields((err,values)=>{
            if(!err){
                this.props.type==='add'? this.props.onOk(form):this.props.onOk(form, this.props.data.key);
            }
        })
    }
    render() {
        return (
            <Modal
                title={this.props.type === 'add' ? "新增banner" : "修改banner"}
                visible={this.props.visible}
                onOk={this.onOk}
                onCancel={this.props.onCancel}
            >
                <BannerInfoForm wrappedComponentRef={(ref) => { this.ref = ref }} />
            </Modal>

        )
    }
}
export default BannerInfoModal;