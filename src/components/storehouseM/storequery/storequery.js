import React from 'react';
import { Form, Button, Card, Table, Row, Col } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import pagination from '../../pagination';
import { parseParams } from '../../../axios/tools';
import Url from '../../../api/config';

//书籍状态映射
export const statusConfig = {
    '0': '库存中/空闲可借',
    '1': '已预定',
    '2': '待上架',
    '9': '已经借出',
};

const StoreQuerySearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
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
            const formList = [
                { type: 'SELECT', label: '仓库/柜子', name: 'storeORcase', list: [] },
                { type: 'SELECT', label: '图书分类', name: 'category', list: [] },
                { type: 'INPUT', label: '货位/格子', name: 'location' },
                { type: 'INPUT', label: 'ISBN', name: 'isbn' },
                { type: 'INPUT', label: '电子标签', name: 'rfid' },
                { type: 'INPUT', label: '出版社', name: 'publisher' },
                { type: 'INPUT', label: '书名', name: 'bookName' },
                { type: 'INPUT', label: '作者', name: 'author' },
                { type: 'SELECT', label: '状态', name: 'state', list: [] },
            ].map(i => ({ ...i, formItemLayout: formItemLayout }));
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        {getFormItem(form, formList).map((i, index) => <Col key={index} span={8}>{i}</Col>)}
                    </Row>
                    <div style={{ textAlign: "right" }}>
                        <Button style={{ marginRight: '50px' }} type="primary" htmlType="submit">查询</Button>
                    </div>
                </Form>
            );
        }
    }
);

class StoreQuery extends React.Component {
    state = {}

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
        /**搜索参数 */
        search: {
        },
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        let params = {
            start: this.params.currentPage - 1,
            size: this.params.pageSize,
            ...this.params.search,
        };
        fetch(`${Url}/warehouse/bookinstores?${parseParams(params)}`, { credentials: 'include' })
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
                        ...i,
                        key: i.bookId,
                        bookName: i.bsBookinfo.bookName,
                        author: i.bsBookinfo.author,
                        isbn: i.bsBookinfo.isbn,
                        price: i.bsBookinfo.price,
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }


    render() {
        const columns = [
            { title: '序号', dataIndex: 'bookId' },
            { title: '书名', dataIndex: 'bookName' },
            { title: '作者', dataIndex: 'author' },
            { title: '电子标签', dataIndex: 'rfid' },
            { title: 'ISBN', dataIndex: 'isbn' },
            { title: '图书分类', dataIndex: 'category' },
            { title: '状态', dataIndex: 'status', render: (status) => statusConfig[status] },
            { title: '成本价', dataIndex: 'price' },
            { title: '仓库/柜子', dataIndex: 'storeORcase' },
            { title: '货位/格子', dataIndex: 'location' },
        ];

        return (
            <div className="">
                <BreadcrumbCustom first="仓库管理" second="库存查询" />
                <Card
                    title="库存查询"
                >
                    <StoreQuerySearch />
                    <Table
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

export default StoreQuery;