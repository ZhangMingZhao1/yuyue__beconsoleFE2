import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, Divider, Pagination } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import Url from '../../../api/config';
import pagination from '../../pagination';
import { getFormItem } from '../../baseFormItem';

//书籍状态
const bookStatusConfig = {
    "0": "库存中/空闲可借",
    "1": "已预定",
    "2": "上架",
    "9": "已经借出"
}

const GoodsSearchForm = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const statusList = [];
            for (let i in bookStatusConfig) {
                statusList.push({ "id": i, "name": bookStatusConfig[i] });
            }
            const formList = [
                { type: 'SELECT', label: '分类', name: 'categoryName', width: '100px', list: [] },
                { type: 'SELECT', label: '状态', name: 'status', width: '100px', list: statusList },
                { type: 'SELECT', label: '出版社', name: 'pubName', width: '100px' },
                { type: 'INPUT', placeholder: '名称/ISBN/作者模糊查询', name: 'fuzzyQuery', width: '300px' },
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

class GoodsM extends React.Component {
    state = {}

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小 
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${Url}/book/bookinstores?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
            .then((res) => res.json()).then(data => {
                this.setState({
                    pagination: pagination(data, (current) => {//改变页码
                        this.params.currentPage = current;
                        this.requestList();
                    }, (size) => {//pageSize 变化的回调
                        this.params.pageSize = size;
                        this.requestList();
                    }),
                    dataSource: data.content.map(i => ({
                        key: i.bookId,
                        bookId: i.bookId,
                        bookinfoId: i.bsBookinfo.bookinfoId,
                        bookName: i.bsBookinfo.bookName,
                        categoryName: i.bsBookinfo.categoryName,
                        author: i.bsBookinfo.author,
                        pubName: i.bsBookinfo.bsPublishinfo.pubName,
                        rfid: i.rfid,
                        status: i.status
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        const columns = [{
            title: '商品ID',
            dataIndex: 'bookId',
        }, {
            title: '书目ID',
            dataIndex: 'bookinfoId',
        }, {
            title: '书籍名称',
            dataIndex: 'bookName',
        }, {
            title: '分类',
            dataIndex: 'categoryName',
        }, {
            title: '作者',
            dataIndex: 'author',
            width: '20%'
        }, {
            title: '出版社',
            dataIndex: 'pubName',
        }, {
            title: 'RFID',
            dataIndex: 'rfid',
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (status) => bookStatusConfig[status]
        }, {
            title: '仓库货位',
            dataIndex: 'warehouseP',
        }, {
            title: '格子编号',
            dataIndex: 'cellId',
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => {
                switch (record.status) {
                    case 0:
                        return <span><a href="javascript:;">下架</a></span>
                    case 1:
                        return <span><a href="javascript:;">查看订单详情</a></span>
                    case 2:
                        return <span><a href="javascript:;">修改</a><Divider type="vertical" /><a href="javascript:;">上架</a></span>
                    case 9:
                        return <span><a href="javascript:;">查看订单详情</a></span>
                    default:
                        return null
                }
            }
        }];

        return (
            <div className="">
                <BreadcrumbCustom first="书籍管理" second="商品管理" />
                <Card
                    title="商品管理"
                >
                    <GoodsSearchForm /><br />
                    <Table
                        className="goodsM-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
            </div>

        )
    }
}

export default GoodsM;