import React from 'react';
import { Card, Form, Button, Modal } from 'antd';
import { getFormItem } from '../../baseFormItem';
import "./index.less"
import InStoreTable from './inStoreTable';
import { connect } from 'react-redux';

const confirm = Modal.confirm;
const InStoreForm = Form.create()(
    class extends React.Component {
        render() {
            const { form, type } = this.props;
            const formList = [
                { type: 'INPUT', label: '订单编号', name: 'orderCode', disabled: true },
                { type: 'SELECT', label: '入库仓库', name: 'store', width: '100px', list: [] },
                { type: 'SELECT', label: '入库类型', name: 'inType', width: '100px', list: [] },
                { type: 'INPUT', label: '制单人', disabled: true, name: 'creator', width: '100px', initialValue: this.props.userName },
                { type: 'INPUT', label: '运费', name: 'freight', width: '100px', extra: '元' },
            ];
            if (type !== 'add') {
                formList.forEach(i => {
                    i.disabled = true
                })
            }
            return (
                <Form layout="inline" >
                    {getFormItem(form, formList)}
                </Form>
            );
        }
    }
);

class InStoreInfo extends React.Component {
    state = { 
        data: [],
        userName: this.props.user && this.props.user.data.userName,
    }

    handleSave = () => {
        this.table.getTableValues((v) => { console.log(v) })
        this.outStore_formRef.props.form.getFieldsValue()
    }

    handleDelete = () => {
        confirm({
            title: '确认删除该订单？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('删除订单');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleSubmit = () => {
        confirm({
            title: '确认提交该订单？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                console.log('提交订单');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleCheck = () => {
        confirm({
            title: '审核是否该订单？',
            okText: '通过',
            cancelText: '不通过',
            onOk() {
                console.log("变为'草稿'");
            },
            onCancel() {
                console.log("订单状态为'审核通过'");
            },
        });
    }

    outStoreFormRef = (formRef) => {
        this.outStore_formRef = formRef;
    }

    render() {
        const type = this.props.match.params.type;

        const config_state = {
            'add': '草稿',
            'check': '待审核',
            'detail': '已审核',
        }

        const action_btn = {
            'add': [
                { text: '保存', onClick: this.handleSave },
                { text: '删除', onClick: this.handleDelete },
                { text: '提交', onClick: this.handleSubmit },
                { text: '审核', onClick: this.handleCheck, disabled: true },

            ],
            'check': [
                { text: '保存', onClick: this.handleSave, disabled: true },
                { text: '删除', onClick: this.handleDelete, disabled: true },
                { text: '提交', onClick: this.handleSubmit, disabled: true },
                { text: '审核', onClick: this.handleCheck },
            ],
            'detail': [
                { text: '打印', onClick: () => { } },
            ],
        }

        const title = <div>
            {
                action_btn[type].map((i, index) => (
                    <Button key={index} type="primary" onClick={i.onClick} disabled={i.disabled ? true : false}>
                        {i.text}
                    </Button>
                ))
            }
        </div>
        console.log(this.props.user)
        return (
            <div className="" >
                <Card
                    title={title}
                >
                    <div style={{ textAlign: 'right' }}><Button type="primary" disabled>{config_state[type]}</Button></div>
                    <h1 style={{ display: 'block', textAlign: 'center', fontSize: '26px', weight: 'bolder' }}>入库单</h1>
                    <InStoreForm
                        type={type}
                        wrappedComponentRef={this.outStoreFormRef}
                        userName={this.props.user && this.props.user.data.userName}
                    /><br />
                    <InStoreTable
                        type={type}
                        ref={(ref) => { this.table = ref }}
                        dataSource={this.state.data}
                    />
                </Card>
            </div>
        )
    }
}

const mapStateToPorps = state => ({
    user: state.getIn(['login', 'user'])
});

export default connect(mapStateToPorps)(InStoreInfo);