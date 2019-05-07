
import React from 'react';
import { Form, Modal, Row, Col } from 'antd';
import './index.less';
import { getFormItem } from '../../baseFormItem';
import { positionConfig } from '.';

const AdInfoForm = Form.create()(
    class extends React.Component {
        render() {
            const { form, data, caseInfo } = this.props;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
            let positionList = [];
            for (let val in positionConfig) {
                positionList.push({ id: val, name: positionConfig[val] })
            }
            let caseList = [];
            for (let i in caseInfo) {
                caseList.push({ id: i, name: caseInfo[i] });
            }
            const formList = [
                { type: 'INPUT', label: '名称', name: 'name', formItemLayout },
                { type: 'SELECT', label: '柜子', name: 'caseId', width: '300px', list: caseList, formItemLayout },
                { type: 'SWITCH', label: '状态', name: 'status', width: '100px', formItemLayout },
                { type: 'SELECT', label: '位置', name: 'position', width: '100px', list: positionList, formItemLayout },
                { type: 'DATEPICKER', label: '开始时间', name: 'startTime', width: '100px', formItemLayout },
                { type: 'DATEPICKER', label: '结束时间', name: 'endTime', width: '100px', formItemLayout },
                { type: 'UPLOAD', label: '图片', name: 'image', width: '100px', formItemLayout },
            ];
            if (data) {
                data.image = (data.advUrl === "暂无图片" ? null : data.advUrl);
                formList.forEach(i => {
                    i.initialValue = data[i.name];
                })
            }
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


class AdInfoModal extends React.Component {
    onOk = () => {
        let form = this.ref.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                this.props.type === 'add' ? this.props.onOk(form) : this.props.onOk(form, this.props.data.key);
            }
        })
    }

    onCancel = () => {
        let form = this.ref.props.form;
        form.resetFields();//重置表单
        this.props.onCancel();
    }

    render() {
        return (
            <Modal
                title={this.props.type === 'add' ? "新增广告" : "修改广告"}
                visible={this.props.visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
            >
                <AdInfoForm
                    wrappedComponentRef={(ref) => { this.ref = ref }}
                    data={this.props.type === 'add' ? null : this.props.data}
                    caseInfo={this.props.caseInfo}
                />
            </Modal>

        )
    }
}
export default AdInfoModal;