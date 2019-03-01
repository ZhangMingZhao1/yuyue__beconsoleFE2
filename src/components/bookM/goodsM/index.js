import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, Divider, Pagination } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { fetchGet } from '../../../axios/tools';

const { Option } = Select;

const GoodsSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            key: 1,
            label: "分类",
            placeholder: "全部",
            name: "category",
            value: ['1', '2']
        }, {
            key: 2,
            label: "状态",
            placeholder: "全部",
            name: "state",
            value: ['1', '2']
        }, {
            key: 3,
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
                        <Input placeholder="名称/ISBN/作者模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class GoodsM extends React.Component {
    state = {}

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetchGet({
            url: '/bookM/goodsM',
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
        let id = 0;
        const columns = [{
            title: '商品ID',
            dataIndex: 'goodsId',
        }, {
            title: '书目ID',
            dataIndex: 'bookId',
        }, {
            title: '书籍名称',
            dataIndex: 'bookName',
        }, {
            title: '分类',
            dataIndex: 'category',
        }, {
            title: '作者',
            dataIndex: 'author',
        }, {
            title: '出版社',
            dataIndex: 'publisher',
        }, {
            title: 'RFID',
            dataIndex: 'rfid',
        }, {
            title: '状态',
            dataIndex: 'state',
            render: (state) => {
                switch (state) {
                    case 0:
                        return '库存中/空闲可借'
                    case 1:
                        return '已预定'
                    case 2:
                        return '待上架'
                    case 3:
                        return '已经借出'
                    default:
                        return null
                }
            }
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
                switch (record.state) {
                    case 0:
                        return <span><a href="javascript:;">下架</a></span>
                    case 1:
                        return <span><a href="javascript:;">查看订单详情</a></span>
                    case 2:
                        return <span><a href="javascript:;">修改</a><Divider type="vertical" /><a href="javascript:;">上架</a></span>
                    case 3:
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
                    <GoodsSearchForm /><br/>
                    <Table
                        className="goodsM-table"
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

export default GoodsM;