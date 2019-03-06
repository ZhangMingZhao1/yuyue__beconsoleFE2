import React from 'react';
import { Card, Form, Button, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import "./index.less"
import Link from 'react-router-dom/Link';

const MvStoreSearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'SELECT', label: '出库仓库', name: 'outStore', width: '100px', list: [] },
                { type: 'INPUT', label: '制单人', name: 'creator' },
                { type: 'SELECT', label: '入库仓库', name: 'inStore', width: '100px', list: [] },
                { type: 'INPUT', label: '审核人', name: 'checkman' },
                { type: 'SELECT', label: '订单状态', name: 'orderState', width: '100px', list: [] },
                { type: 'INPUT', label: '订单编号', name: 'orderCode' },
                { type: 'RANGPICKER', label: '制单时间', name: 'createTime' },
                { type: 'RANGPICKER', label: '审核时间', name: 'checkTime' },
                { type: 'INPUT', label: 'ISBN', name: 'isbn' },
                { type: 'INPUT', label: '电子标签', name: 'eLabel' },
                { type: 'INPUT', placeholder: '书籍名称/出版社/作者模糊查询', name: 'fuzzyQuery', width: '300px' },
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

class MvStoreData extends React.Component {

    handleSubmit = (params) => {
        console.log(params);
    }

    render() {
        const columns = [
            { title: '订单编号', dataIndex: 'orderCode' },
            { title: '出库仓库', dataIndex: 'outStore' },
            { title: '制单人', dataIndex: 'creator' },
            { title: '制单时间', dataIndex: 'createTime' },
            { title: '入库仓库', dataIndex: 'inStore' },
            { title: '审核人', dataIndex: 'checkMan' },
            { title: '审核时间', dataIndex: 'checkTime' },
            { title: '运费', dataIndex: 'freight' },
            {
                title: '订单状态', dataIndex: 'orderState',
                render: (state) => {
                    let config = {
                        '1': '草稿',
                        '2': '待审核',
                        '3': '已审核',
                    }
                    return config[state];
                }
            },
            {
                title: '操作', dataIndex: 'action',
                render: (text, record) => {
                    let config = {
                        '1': <Link to={`${this.props.match.url}/add`}>编辑</Link>,
                        '2': <Link to={`${this.props.match.url}/check`}>审核</Link>,
                        '3': <Link to={`${this.props.match.url}/detail`}>查看</Link>,
                    }
                    return config[record.orderState];
                }
            }
        ];

        return (
            <div className="" >
                <BreadcrumbCustom first="仓库管理" second="移库单" />
                <Card
                    title="移库单查询"
                >
                    <MvStoreSearch handleSubmit={this.handleSubmit} />
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" ><Link to={`${this.props.match.url}/add`}>新建</Link></Button>
                        <Button type="primary" onClick={this.handleExport}>导出</Button>
                    </div><br />
                    <Table
                        className="mvStoreData-table"
                        columns={columns}
                        dataSource={[{ key: 1, orderState: 1 }, { key: 2, orderState: 2 }, { key: 3, orderState: 3 },]}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                        bordered
                    />
                </Card>
            </div>
        )
    }
}

export default MvStoreData;