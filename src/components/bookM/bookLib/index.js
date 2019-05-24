import React from 'react';
import { Form, Select, Input, Button, Card, Table, Divider } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import Url from '../../../api/config';
import pagination from '../../pagination';
import { getFormItem } from '../../baseFormItem';

const BookSearchForm = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            // console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'SELECT', label: '分类', name: 'categoryName', width: '100px', list: [] },
                { type: 'SELECT', label: '是否精选', name: 'recommend', width: '100px', list: [{ id: "2", name: "全部" }, { id: "0", name: "否" }, { id: "1", name: "是" }] },
                { type: 'RANGPICKER', label: '出版社', name: 'pubName', width: '300px' },
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

class BookLib extends React.Component {
    state = {}

    componentDidMount() {
        this.requestList();
    }

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    requestList = () => {
        fetch(`${Url}/book/bookinfos?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
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
                        key: i.bookinfoId,
                        bookinfoId: i.bookinfoId,
                        bookName: i.bookName,
                        isbn: i.isbn,
                        author: i.author,
                        pubName: i.bsPublishinfo.pubName,
                        recommend: i.recommend,
                        categoryName: i.categoryName,
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        const columns = [
            { title: '书目ID', dataIndex: 'bookinfoId', width: '5%' },
            { title: '名称', dataIndex: 'bookName', width: '25%' },
            { title: 'ISBN', dataIndex: 'isbn', width: '10%' },
            { title: '作者', dataIndex: 'author', width: '20%' },
            { title: '出版社', dataIndex: 'pubName', width: '15%' },
            { title: '是否精选', dataIndex: 'recommend', width: '5%' },
            { title: '分类', dataIndex: 'categoryName', width: '10%' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <Link to={`${this.props.match.url}/modifyBookLib/${record.bookinfoId}`}>修改</Link>
                        <Divider type="vertical" />
                        <a href="javascript:;">删除</a>
                    </span>
                ),
            }];

        return (
            <div className="">
                <BreadcrumbCustom first="书籍管理" second="书目库" />
                <Card
                    title="书目库"
                >
                    <BookSearchForm /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary"><Link to={`${this.props.match.url}/addBookLib`}>新增</Link></Button>
                        <Button type="primary">导入</Button>
                    </div>
                    <Table className="infoC-table"
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

export default BookLib;