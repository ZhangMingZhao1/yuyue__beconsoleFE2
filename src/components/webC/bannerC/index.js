
import React from 'react';
import { Form, Button, Card, Table, Divider, Modal } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import BannerInfoModal from './infoModal';

const confirm = Modal.confirm;

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
        dataSource: [
            {
                key: 1,
                id: 1,
                name: '活动1',
                location: "APP首页",
                state: true,
                index: 1,
                link: 'https://www.2345.com/?38264-0011'
            },
            {
                key: 2,
                id: 2,
                name: '活动2',
                location: "APP首页",
                state: false,
                index: 2,
                link: 'https://www.2345.com/?38264-0011'
            }
        ],
    }

    handleDelete = () => {
        confirm({
            title: '是否确定删除？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                console.log('删除？');
            },
            onCancel() {
                console.log('Cancel');
            },
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
            { title: 'ID', dataIndex: 'id' },
            { title: 'banner名称', dataIndex: 'name' },
            { title: '投放位置', dataIndex: 'location' },
            {
                title: '状态', dataIndex: 'state',
                render: (text) => (
                    text ? '启用' : '禁用'
                )
            },
            { title: '排序', dataIndex: 'index' },
            { title: '链接', dataIndex: 'link' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={() => { this.setState({ modalType: 'modify', visible: true }) }}>修改</a>
                        <Divider type="vertical" />
                        <a onClick={this.handleDelete}>删除</a>
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
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                        bordered
                    />
                </Card>
                <BannerInfoModal
                    type={this.state.modalType}
                    visible={this.state.visible}
                    onOk={() => { this.setState({ visible: false }) }}
                    onCancel={() => { this.setState({ visible: false }) }}
                />
            </div>

        )
    }
}

export default BannerC;