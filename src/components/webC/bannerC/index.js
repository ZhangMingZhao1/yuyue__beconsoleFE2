import React from 'react';
import { Form, Button, Card, Table, Divider, Modal, message } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import Url from '../../../api/config';
import BannerInfoModal from './infoModal';
import pagination from '../../pagination';
import { parseParams } from '../../../axios/tools';

const confirm = Modal.confirm;

//位置映射
export const typeConfig = {
    '1': '首页轮播图',
    '2': '首页通知图标',
    '3': '鱼群顶部横幅',
    '4': '鱼群动态页横幅',
};

const BannerSearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'SELECT', label: '投放位置', name: 'location', width: '100px', list: [] },
                { type: 'INPUT', placeholder: '按名称关键字模糊查询', name: 'fuzzyQuery', width: '300px' },
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

class BannerC extends React.Component {
    state = {
        visible: false,
        modalType: 'add',
    }

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${Url}/pictures?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
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
                        key: i.picId,
                        ...i
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    handleOk = (form, key) => {
        if (this.state.modalType === 'add') {//新增banner
            this.handleAdd(form);
        } else {//修改banner
            this.handleModify(form, key);
        }
    }

    //新增banner
    handleAdd = (form) => {
        let values = form.getFieldsValue();
        const formData = new FormData();
        values = { ...values, status: values.status ? "1" : "0" };
        let image = values.image.imageList[0];
        if (image && image.originFileObj) {//判断values.image[0].originFileObj是否存在
            values.image = image.originFileObj;
        } else {
            delete values.image;//不存在 删除image属性
        }
        for (let v in values) {
            formData.append(v, values[v]);
        }

        fetch(`${Url}/pictures`, {
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
     * 修改banner
     */
    handleModify = (form, key) => {
        let values = form.getFieldsValue();
        const formData = new FormData();
        let image = values.image.imageList[0];
        if (image && image.originFileObj) {
            formData.append("image", image.originFileObj);//formDate image
        }
        delete values.image;
        values = { ...values, status: values.status ? "1" : "0", picId: key };

        fetch(`${Url}/pictures?${parseParams(values)}`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: formData
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("更新成功 " + JSON.stringify(result.data))
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
     * 删除banner
     */
    handleDelete = (key) => {
        let _this = this;
        confirm({
            title: '是否确定删除？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                fetch(`${Url}/pictures/${key}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => res.json()).then(result => {
                    if (result.code === 0) {
                        message.success("删除" + JSON.stringify(result.data) + "成功")
                        _this.requestList();//刷新页面
                    } else {
                        message.error(result.message)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        });
    }

    handleEnable = () => {
        confirm({
            title: '是否确定启用？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                console.log('启用');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleDisable = () => {
        confirm({
            title: '是否确定禁用？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                console.log('禁用');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const columns = [
            { title: 'ID', dataIndex: 'picId' },
            { title: 'banner名称', dataIndex: 'description' },
            {
                title: '投放位置', dataIndex: 'type',
                render: (location) => typeConfig[location]
            },
            {
                title: '状态', dataIndex: 'status',
                render: (text) => (
                    text === 1 ? '启用' : '禁用'
                )
            },
            { title: '排序', dataIndex: 'sort' },
            { title: '链接', dataIndex: 'picUrl' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <a
                            onClick={() => {
                                this.setState({
                                    modalType: 'modify',
                                    modalData: { ...record, status: record.status === 0 ? false : true },
                                    visible: true
                                })
                            }
                            }
                        >
                            修改
                        </a>
                        <Divider type="vertical" />
                        <a onClick={() => { this.handleDelete(record.picId) }}>删除</a>
                    </span>
                ),
            }
        ];

        return (
            <div className="">
                <BreadcrumbCustom first="网站管理" second="banner管理" />
                <Card
                    title="banner管理"
                >
                    <BannerSearch />
                    <div style={{ textAlign: 'left' }}>
                        <Button type="primary" onClick={() => { this.setState({ modalType: 'add', visible: true }) }}>新增</Button>
                    </div><br />
                    <Table className="advertise-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
                <BannerInfoModal
                    type={this.state.modalType}
                    visible={this.state.visible}
                    data={this.state.modalData}
                    onOk={this.handleOk}
                    onCancel={() => { this.setState({ modalData: null, visible: false }) }}
                    // onCancel={() => { this.setState({ visible: false }) }}
                />
            </div>

        )
    }
}

export default BannerC;