
import React from 'react';
import { Form, Button, Card, Table, Divider, Modal } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import AdInfoModal from './infoModal';

const confirm = Modal.confirm;

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
        dataSource: [
            {
                key: 1,
                id: 1,
                name: '活动1',
                case: '万科001柜',
                location: '广告位1',
                state: true,
                beginTime: "2018-12-12 22：00：00",
                endTime: '2018-12-13 22：00：00',
                link: 'https://www.2345.com/?38264-0011'
            },
            {
                key: 2,
                id: 2,
                name: '活动2',
                case: '万科003柜',
                location: '广告位1',
                state: false,
                beginTime: "2020-12-12 22：00：00",
                endTime: '2020-12-13 22：00：00',
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
            { title: '名称', dataIndex: 'name' },
            { title: '柜子', dataIndex: 'case' },
            { title: '广告位置', dataIndex: 'location' },
            {
                title: '状态', dataIndex: 'state',
                render: (text) => (
                    text ? '启用' : '禁用'
                )
            },
            { title: '开始时间', dataIndex: 'beginTime' },
            { title: '结束时间', dataIndex: 'endTime' },
            { title: '链接', dataIndex: 'link' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    record.state ?
                        <a onClick={this.handleDisable}>禁用</a> :
                        <span>
                            <a onClick={()=>{this.setState({modalType:'modify',visible:true})}}>修改</a>
                            <Divider type="vertical" />
                            <a onClick={this.handleDelete}>删除</a>
                            <Divider type="vertical" />
                            <a onClick={this.handleEnable}>启用</a>
                        </span>
                ),
            }
        ];

        return (
            <div className="">
                <BreadcrumbCustom first="网站管理" second="广告管理" />
                <Card
                    title="广告管理"
                >
                    <AdSearch />
                    <div style={{ textAlign: 'left' }}>
                        <Button type="primary" onClick={() => {this.setState({modalType:'add',visible: true})}}>新增</Button>
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
                <AdInfoModal
                    type={this.state.modalType}
                    visible={this.state.visible}
                    onOk={()=>{this.setState({visible: false})}}
                    onCancel={()=>{this.setState({visible: false})}}
                />
            </div>

        )
    }
}

export default AdvertiseM;