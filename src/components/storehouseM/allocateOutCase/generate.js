import React from 'react';
import { Card, Form, Button, Modal, Row, Col } from 'antd';
import { getFormItem } from '../../baseFormItem';
import "./index.less"
import { allocateType } from '.';

const confirm = Modal.confirm;
const GenerateForm = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            this.props.onSubmit();
        }

        render() {
            const { form } = this.props;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 15 },
                },
            };
            const allocateTypeList = [];
            for (let v in allocateType) {
                allocateTypeList.push({ id: v, name: allocateType[v] });
            }
            const formList = [
                { type: 'INPUT', label: '订单编号', name: 'code' },
                { type: 'SELECT', label: '调拨类型', name: 'type', list: allocateTypeList },
                { type: 'INPUT', label: '制单人', name: 'maker', disabled: true },
                { type: 'SELECT', label: '调拨方', name: 'allocator' },
                { type: 'SELECT', label: '接收方', name: 'receiver' },
            ].map(i => ((i.formItemLayout) ? i : { ...i, formItemLayout: formItemLayout }));
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        {getFormItem(form, formList).map((i, index) => (<Col key={index} span={8}>{i}</Col>))}
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button style={{ marginRight: '50px' }} size="large" type="primary" htmlType="submit">去选书</Button>
                    </div>
                </Form>
            );
        }
    }
);

class Generate extends React.Component {
    state = { data: [] }

    handleSave = () => {

    }

    handleDel = () => {

    }

    handleSubmit = () => {
        this.props.history.push("/app/storehouseM/transferOutData/select");
    }

    outStoreFormRef = (formRef) => {
        this.outStore_formRef = formRef;
    }

    render() {
        return (
            <div>
                <Card
                    title={<div>
                        <Button type="primary" onClick={this.handleSave}>保存</Button>
                        <Button type="primary" onClick={this.handleDel}>删除</Button>
                    </div>}
                >
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" disabled>草稿</Button>
                    </div>
                    <h1 style={{ display: 'block', textAlign: 'center', fontSize: '26px', weight: 'bolder' }}>生成调拨出柜单</h1>
                    <GenerateForm
                        wrappedComponentRef={this.outStoreFormRef}
                        onSubmit={()=>{this.handleSubmit()}}
                    /><br />
                </Card>
            </div>
        )
    }
}

export default Generate;