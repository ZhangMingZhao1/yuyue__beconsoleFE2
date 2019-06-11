import React from 'react';
import { Card, Form, Button, Modal, message } from 'antd';
import { getFormItem } from '../../baseFormItem';
import "./index.less"
import Req from '../request';
import { typeConfig } from '../config/warehouseRConfig';
import OutStoreTable from './outStoreTable';

const confirm = Modal.confirm;
const OutStoreForm = Form.create()(
    class extends React.Component {
        state = {}
        componentDidMount() {
            Req.getUserWarehouses().then(data => { this.setState({ warehouseList: data }) })
        }
        render() {
            const { form, dataSource } = this.props;
            const formList = [
                { type: 'INPUT', label: '订单编号', name: 'orderNo', disabled: true },
                { type: 'SELECT', label: '出库仓库', name: 'warehouseId', width: '100px', list: this.state.warehouseList, onChange: this.props.onChange },
                { type: 'SELECT', label: '出库类型', name: 'type', width: '100px', list: typeConfig[1] },
                { type: 'INPUT', label: '制单人', disabled: true, name: 'user2Name', width: '100px', initialValue: localStorage.getItem('user').replace(/^\"(\w+)\"$/g, "$1") },
                { type: 'INPUT', label: '运费', name: 'fee', width: '100px', extra: '元' },
                { type: 'TEXTAREA', label: '备注', name: 'remarks', width: '600px' },
            ];
            if (this.props.type !== 'add') {
                //置为不可编辑
                formList.forEach(i => { i.disabled = true });
            }
            if (dataSource) {
                formList.forEach(i => {
                    i.initialValue = dataSource[i.name];
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

class OutStoreInfo extends React.Component {
    state = {
        bookinstores: [],//订单书籍信息
        checkModal: false,//审核订单模态框
        type: this.props.match.params.type,
    }

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() {
        //从url读取id
        let id = new URLSearchParams(this.props.location.search).get("id");
        this.setState({ storageId: id }, () => { this.requestList() })
    }

    componentWillReceiveProps(v) {
        //从url读取id
        let id = new URLSearchParams(v.location.search).get("id");
        let type = v.match.params.type;
        //id值改变||type改变
        if (this.state.storageId !== id || type !== this.state.type) {
            this.setState({ storageId: id, type: type }, () => { this.requestList() })
        }
    }

    requestList = () => {
        let id = this.state.storageId;
        if (id) {
            Req.getStorageRecordsById(id).then(data => {
                //重置表格数据
                this.tableRef.resetTable(() => {
                    this.setState({
                        //库单基本信息
                        baseInfo: {
                            ...data,
                            key: data.orderNo,
                            user2Name: data.user2.userName,
                            warehouseId: data.beWarehouse.warehouseId + '',
                            type: data.type + '',//转换成字符类型，便于SWITH组件的initial显示
                        },
                        //库单书籍列表
                        bookinstores: data.bookinstores ? data.bookinstores.map((i, index) => ({
                            ...i,
                            key: index,
                            locationId: i.locationName,
                        })) : [],
                        //仓库id值
                        warehouseId: data.beWarehouse.warehouseId,
                        //审核时间
                        reviewTime: data.reviewTime,
                        //审核人
                        user1Name: data.user1 && data.user1.userName,
                    })
                })
            })
        }
    }

    /**
     * 保存
     */
    handleSave = () => {
        let _this = this;
        confirm({
            title: '确认保存该订单？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.tableRef.getTableValues((tableValues) => {//表格值不符合规范，将不执行一下语句
                    console.log(tableValues)
                    let baseForm = _this.base_formRef.props.form;
                    baseForm.validateFields((err, formValues) => {
                        if (!err) {
                            if (_this.state.storageId) {/*更新库单*/
                                Req.putStorageRecords({
                                    ...formValues,
                                    status: "1",//状态：草稿
                                    recordType: "1",//出库单
                                    bookinstores: tableValues,
                                    beWarehouse: { warehouseId: formValues.warehouseId },
                                    storageId: _this.state.storageId,
                                }).then(result => {
                                    if (result) {
                                        message.success("更新成功 " + JSON.stringify(result.data))
                                        _this.requestList();//刷新页面
                                    }
                                })
                            } else {/*新增库单*/
                                Req.postStorageRecords({
                                    ...formValues,
                                    status: "1",//状态：草稿
                                    recordType: "1",//出库单
                                    bookinstores: tableValues,
                                    beWarehouse: { warehouseId: formValues.warehouseId }
                                }).then(result => {
                                    if (result) {
                                        let id = result.data;
                                        message.success("新增成功 " + JSON.stringify(result.data))
                                        _this.props.history.push(`/app/storehouseM/outHouseData/add?id=${id}`); //地址栏改变
                                    }
                                })
                            }
                        }
                    })
                })
            }
        });
    }

    /**
     * 删除订单
     */
    handleDelete = () => {
        let _this = this;
        confirm({
            title: '确认删除该订单？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                Req.deleteStorageRecords(_this.state.storageId).then(result => {
                    if (result) {
                        message.success("删除" + JSON.stringify(result.data) + "成功")
                        _this.props.history.push('/app/storehouseM/outHouseData');//跳转到出库单首页
                    }
                })
            }
        });
    }

    /**
     * 在"草稿"状态下提交订单
     */
    handleSubmit = () => {
        let _this = this;
        confirm({
            title: '确认提交该订单？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.tableRef.getTableValues((tableValues) => {//表格值不符合规范，将不执行一下语句
                    console.log(tableValues)
                    let baseForm = _this.base_formRef.props.form;
                    baseForm.validateFields((err, formValues) => {
                        if (!err) {
                            if (_this.state.storageId) {/*更新库单*/
                                Req.putStorageRecords({
                                    ...formValues,
                                    status: "2",//状态：待审核
                                    recordType: "1",//出库单
                                    bookinstores: tableValues,
                                    beWarehouse: { warehouseId: formValues.warehouseId },
                                    storageId: _this.state.storageId,
                                }).then(result => {
                                    if (result) {
                                        message.success("更新成功 " + JSON.stringify(result.data))
                                        _this.props.history.push(`/app/storehouseM/outHouseData/check?id=${_this.state.storageId}`);//跳转到入库单审核 
                                    }
                                })
                            } else {/*新增库单*/
                                Req.postStorageRecords({
                                    ...formValues,
                                    status: "2",//状态：待审核
                                    recordType: "1",//出库单
                                    bookinstores: tableValues,
                                    beWarehouse: { warehouseId: formValues.warehouseId }
                                }).then(result => {
                                    if (result) {
                                        let id = result.data;
                                        message.success("新增成功 " + JSON.stringify(result.data))
                                        _this.props.history.push(`/app/storehouseM/outHouseData/check?id=${id}`); //地址栏改变
                                    }
                                })
                            }
                        }
                    })
                })
            },
        });
    }

    /**
     * 审核
     */
    handleCheck = (pass) => {
        if (pass) {
            console.log("订单状态为'审核通过'");
            Req.putStorageRecordsStatus(this.state.storageId, "3").then(result => {
                if (result) {
                    message.success("审核通过，订单状态变为“审核通过”！")
                    this.setState({ checkModal: false });
                    this.props.history.push(`/app/storehouseM/outHouseData/detail?id=${this.state.storageId}`); //跳转"已审核"状态
                }
            })
        } else {
            console.log("变为'草稿'");
            Req.putStorageRecordsStatus(parseInt(this.state.storageId), "1").then(result => {
                if (result) {
                    message.success("审核不通过，订单状态变为“草稿”！")
                    this.setState({ checkModal: false });
                    this.props.history.push(`/app/storehouseM/outHouseData/add?id=${this.state.storageId}`); //跳转"草稿状态"
                }
            })
        }
    }

    baseFormRef = (formRef) => {
        this.base_formRef = formRef;
    }

    //改变仓库
    onChange = (v) => {
        this.setState({ warehouseId: v })
    }

    render() {
        const type = this.state.type;
        const config_state = {
            'add': '草稿',
            'check': '待审核',
            'detail': '已审核',
        }

        const action_btn = {
            'add': [
                { text: '保存', onClick: this.handleSave },
                { text: '删除', onClick: this.handleDelete, disabled: !this.state.storageId },//新增库单时不显示"删除"按钮，而修改已有库单时显示该按钮
                { text: '提交', onClick: this.handleSubmit },
                { text: '审核', onClick: () => { }, disabled: true },

            ],
            'check': [
                { text: '保存', onClick: () => { }, disabled: true },
                { text: '删除', onClick: () => { }, disabled: true },
                { text: '提交', onClick: () => { }, disabled: true },
                { text: '审核', onClick: () => { this.setState({ checkModal: true }) } },
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
        return (
            <div className="" >
                <Card
                    title={title}
                >
                    <div style={{ textAlign: 'right' }}><Button type="primary" disabled>{config_state[type]}</Button></div>
                    <h1 style={{ display: 'block', textAlign: 'center', fontSize: '26px', weight: 'bolder' }}>出库单</h1>
                    <OutStoreForm
                        type={type}
                        wrappedComponentRef={this.baseFormRef}
                        dataSource={this.state.baseInfo}
                        onChange={this.onChange}//改变仓库
                    /><br />
                    <OutStoreTable
                        type={type}
                        ref={(ref) => { this.tableRef = ref }}
                        dataSource={this.state.bookinstores}
                        warehouseId={this.state.warehouseId}
                        reviewTime={this.state.reviewTime}//审核时间
                        user1Name={this.state.user1Name}//审核人
                    />
                </Card>
                <Modal
                    title="审核订单"
                    visible={this.state.checkModal}
                    onCancel={() => { this.setState({ checkModal: false }) }}
                    footer={null}
                >
                    <p>审核是否通过该订单？</p>
                    <p style={{ textAlign: "center" }}>
                        <Button onClick={() => { this.handleCheck(true) }}>通过</Button>
                        <Button type="primary" onClick={() => { this.handleCheck(false) }}>不通过</Button>
                    </p>
                </Modal>
            </div>
        )
    }
}

export default OutStoreInfo;