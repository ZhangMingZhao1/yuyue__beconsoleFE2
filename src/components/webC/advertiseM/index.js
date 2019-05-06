import React from 'react';
import { Form, Button, Card, Table, Divider, Modal, message, Spin } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import { parseParams } from '../../../axios/tools';
import Url from '../../../api/config';
import AdInfoModal from './infoModal';
import pagination from '../../pagination';
import moment from 'moment';

const confirm = Modal.confirm;

//广告位置映射
export const positionConfig = {
    '广告位1': '广告位1',
    '广告位2': '广告位2',
    '广告位3': '广告位3',
    '广告位4': '广告位4',
    '广告位5': '广告位5',
};

const AdSearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'SELECT', label: '柜子', name: 'outStore', width: '100px', list: [] },
                { type: 'INPUT', placeholder: '按名称模糊查询', name: 'fuzzyQuery', width: '300px' },
            ];
            return (
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {getFormItem(form, formList)}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

class AdvertiseM extends React.Component {
    state = {
        visible: false,
        modalType: 'add',
        confirmLoading: false,
        caseInfo: {},//书柜信息
    }

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() {
        this.requestCaseInfo();
    }

    //获取书柜信息
    requestCaseInfo = () => {
        fetch(`${Url}/bookcaseinfo`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                this.setState({
                    caseInfo: result
                }, () => { this.requestList(); })//获取数据
            }).catch((err) => {
                console.log(err);
            })
    }

    requestList = () => {
        fetch(`${Url}/advertisements?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
            .then((res) => res.json()).then(result => {
                let data = result;
                this.setState({
                    pagination: pagination(data, (current) => {//改变页码
                        this.params.currentPage = current;
                        this.requestList();
                    }, (size) => {//pageSize 变化的回调
                        this.params.pageSize = size;
                        this.requestList();
                    }),
                    dataSource: data.content.map(i => ({
                        key: i.advId,
                        advId: i.advId,
                        name: i.name,
                        caseId: i.bsBookcaseinfo.caseId + "",
                        caseName: i.bsBookcaseinfo.caseName,
                        position: i.position,
                        status: i.status === 1 ? true : false,//1-启用 2-禁用
                        startTime: moment(i.startTime),
                        endTime: moment(i.endTime),
                        advUrl: i.advUrl,
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    /**
     * 增加广告
     */
    handleAdd = (form) => {
        let values = form.getFieldsValue();
        values.status = values.status ? 1 : 2;
        values.startTime = values.startTime && values.startTime.valueOf();
        values.endTime = values.endTime && values.endTime.valueOf();
        console.log(values);
        const formData = new FormData();
        let image = values.image.imageList[0];
        if (image && image.originFileObj) {
            formData.append("image", image.originFileObj);//formDate image
        }
        delete values.image;

        fetch(`${Url}/advertisements?${parseParams(values)}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("新增成功 " + JSON.stringify(result.data))
                form.resetFields();//重置表单
                this.setState({ visible: false });
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 修改广告
     */
    handleModify = (form, key) => {
        let values = form.getFieldsValue();
        values.advId = key;
        values.status = values.status ? 1 : 2;
        values.startTime = values.startTime.valueOf();
        values.endTime = values.endTime.valueOf();
        const formData = new FormData();
        let image = values.image.imageList[0];
        if (image && image.originFileObj) {//判断values.image[0].originFileObj是否存在
            values.image = image.originFileObj;
        } else {
            delete values.image;//不存在 删除image属性
        }
        for (let v in values) {
            formData.append(v, values[v]);
        }

        fetch(`${Url}/advertisements`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: formData
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("修改广告 " + JSON.stringify(result.data))
                form.resetFields();//重置表单
                this.setState({ visible: false });
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 切换广告状态
     */
    handleSwitch = (advId, status) => {
        let params = { advId, status: status ? 2 : 1 };
        fetch(`${Url}/advertisements?${parseParams(params)}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("状态切换成功 " + JSON.stringify(result.data));
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 删除广告
     */
    handleDelete = (key) => {
        fetch(`${Url}/advertisements/${key}`, {
            method: 'DELETE',
            credentials: 'include',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("删除" + JSON.stringify(result.data) + "成功")
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    pop = (title, okCall) => {
        confirm({
            title: title,
            okText: '确认',
            cancelText: '取消',
            onOk: okCall,
        });
    }

    handleOk = (form, key) => {
        if (this.state.modalType === 'add') {//新增广告
            this.handleAdd(form);
        } else {//修改广告
            this.handleModify(form, key);
        }
    }

    render() {
        const columns = [
            { title: 'ID', dataIndex: 'advId' },
            { title: '名称', dataIndex: 'name' },
            { title: '柜子', dataIndex: 'caseName' },
            { title: '广告位置', dataIndex: 'position' },
            {
                title: '状态', dataIndex: 'status',
                render: (status) => (
                    status ? '启用' : '禁用'
                )
            },
            { title: '开始时间', dataIndex: 'startTime', render: (startTime) => startTime.format("YYYY-MM-DD HH:mm:ss") },
            { title: '结束时间', dataIndex: 'endTime', render: (endTime) => endTime.format("YYYY-MM-DD HH:mm:ss") },
            { title: '链接', dataIndex: 'advUrl' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    record.status ?
                        <a onClick={() => {
                            this.pop("是否确定禁用？", () => { this.handleSwitch(record.advId, record.status) })
                        }}>
                            禁用
                        </a > :
                        <span>
                            <a onClick={() => {
                                this.setState({
                                    modalType: 'modify',
                                    modalData: record,
                                    visible: true
                                })
                            }}>
                                修改
                            </a>
                            <Divider type="vertical" />
                            <a onClick={() => {
                                this.pop("是否确定删除？", () => { this.handleDelete(record.advId) })
                            }}>
                                删除
                            </a>
                            <Divider type="vertical" />
                            <a onClick={() => {
                                this.pop("是否确定启用？", () => { this.handleSwitch(record.advId, record.status) })
                            }}>
                                启用
                            </a>
                        </span>
                ),
            }
        ];

        return (
            <Spin spinning={this.state.confirmLoading} delay={500}>
                <BreadcrumbCustom first="网站管理" second="广告管理" />
                <Card
                    title="广告管理"
                >
                    <AdSearch />
                    <div style={{ textAlign: 'left' }}>
                        <Button type="primary" onClick={() => { this.setState({ modalType: 'add', visible: true }) }}>新增</Button>
                    </div><br />
                    <Table
                        className="advertise-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
                <AdInfoModal
                    type={this.state.modalType}
                    visible={this.state.visible}
                    data={this.state.modalData}
                    onOk={this.handleOk}
                    onCancel={() => { this.setState({ visible: false }) }}
                    caseInfo={this.state.caseInfo}
                />
            </Spin>

        )
    }
}

export default AdvertiseM;