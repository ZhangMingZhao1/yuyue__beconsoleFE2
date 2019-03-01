import React from 'react';
import { Form, Select, Input, Button, Card, Table, Divider } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import { fetchGet } from '../../../axios/tools';

const { Option } = Select;
const BookSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            label: "分类",
            placeholder: "全部",
            name: "category",
            value: ['1', '2']
        }, {
            label: "是否精选",
            placeholder: "全部",
            name: "isSelected",
            value: ['是', '否'],
        }, {
            label: "出版社",
            placeholder: "全部",
            name: "publisher",
            value: ['1', '2']
        }];
        return (
            <Form layout="inline">
                {selectData.map(i => (
                    <Form.Item key={i.name} label={i.label}>
                        {getFieldDecorator(i.name)(
                            <Select placeholder={i.placeholder} style={{ width: 120 }}>
                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                            </Select>
                        )}
                    </Form.Item>
                ))}
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery')(
                        <Input placeholder="名称/ISBN/作者模糊查询" style={{ width: 200 }} />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class BookLib extends React.Component {
    state = {}

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetchGet({
            url: '/bookM/bookLib/list',
            params: {
                page: 1
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource: res.result.list,
                })
            }
        })
    }

    render() {
        const columns = [{
            title: '书目ID',
            dataIndex: 'bibliographyId',
        }, {
            title: '名称',
            dataIndex: 'name',
        }, {
            title: 'ISBN',
            dataIndex: 'isbn',
        }, {
            title: '作者',
            dataIndex: 'author',
        }, {
            title: '出版社',
            dataIndex: 'publisher',
        }, {
            title: '是否精选',
            dataIndex: 'isSelected',
        }, {
            title: '分类',
            dataIndex: 'category',
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`${this.props.match.url}/modifyBookLib/${record.bibliographyId}`}>修改</Link>
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

export default BookLib;