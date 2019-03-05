import React from 'react';
import { Card, Form, Button, Divider, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import "./index.less"
import { Link } from 'react-router-dom'
import OutStoreTable from './outStoreTable';

const OutStoreForm = Form.create()(
    class extends React.Component {
        render() {
            const { form,type } = this.props;
            const formList = [
                { type: 'INPUT', label: '订单编号', name: 'orderCode', disabled: true },
                { type: 'SELECT', label: '出库仓库', name: 'store', width: '100px', list: [] },
                { type: 'SELECT', label: '出库类型', name: 'outType', width: '100px', list: [] },
                { type: 'INPUT', label: '制单人', disabled: true, name: 'creator', width: '100px', list: [] },
                { type: 'INPUT', label: '运费', name: 'freight', width: '100px', extra: '元' },
                { type: 'TEXTAREA', label: '备注', name: 'remarks', width: '600px' },
            ];
            if (type!=='add'){
                formList.forEach(i=>{
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

class OutStoreData extends React.Component {
    state = { data: [] }

    handleSave = () => {
        this.table.getTableValues((v) => { console.log(v) })
        this.outStore_formRef.props.form.getFieldsValue()
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
                { text: '删除', onClick: () => { } },
                { text: '提交', onClick: () => { } },
                { text: '审核', onClick: () => { }, disabled: true },

            ],
            'check': [
                { text: '保存', onClick: this.handleSave, disabled: true },
                { text: '删除', onClick: () => { }, disabled: true },
                { text: '提交', onClick: () => { }, disabled: true },
                { text: '审核', onClick: () => { } },
            ],
            'detail': [
                { text: '打印', onClick: () => { }, disabled: true },
            ],
        }

        const title = <div>
            {
                action_btn[type].map((i,index) => (
                    <Button key={index} type="primary" onClick={i.onClick} disabled={i.disabled ? true : false}>
                        {i.text}
                    </Button>
                ))
            }
        </div>

        return (
            <div className="" >
                <Card
                    title={title}
                >
                    <div style={{ textAlign: 'right' }}><Button type="primary" disabled>{config_state[type]}</Button></div>
                    <h1 style={{ display: 'block', textAlign: 'center', fontSize: '26px', weight: 'bolder' }}>出库单</h1>
                    <OutStoreForm
                        type={type}
                        wrappedComponentRef={this.outStoreFormRef}
                    /><br />
                    <OutStoreTable
                        type={type}
                        ref={(ref) => { this.table = ref }}
                        dataSource={this.state.data}
                    />
                </Card>
            </div>
        )
    }
}

export default OutStoreData;