import React from 'react';
import { Card, Button, Input, Select, Form, Table, Divider, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import URL from '../../../api/config';
import { Link } from 'react-router-dom';
import pagination from '../../pagination';// 翻页
import { parseParams } from '../../../axios/tools';// 翻页

const Option = Select.Option;
const confirm = Modal.confirm;
const SearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            label: "所属仓库",
            placeholder: "全部",
            name: "category",
            value: ['全部', '朝阳街道']
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
                    <Input placeholder="柜子名称，编号，运维人，地址模糊查询" style={{ width: 350 }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class StaffM extends React.Component {

    state = {
        data: [],
    }

    componentDidMount() {
        this.requestList();
    }
    // 翻页
    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    showConfirm = () => {
        confirm({
            title: 'Want to delete these items?',
            content: 'some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // TO CHANGE 缺少运维联系方式、操作员、修改日期字段
    requestList = () => {
        // 翻页
        let params = {
            start: this.params.currentPage - 1,
            size: this.params.pageSize,
        };
        // const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/systemM/cabinetM';
        // 翻页
        fetch(`${URL}/system/bookcaseinfos?${parseParams(params)}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(data => {
                const { content, user } = data;
                console.log(content);
                content.map((i) => {
                    i.key = i.caseId;
                    i.status = i.status ? '正常' : '异常';
                    i.beWarehouseName = i.beWarehouse.warehouseName;
                    i.ywName = i.user.userName;
                    i.phoneNum = i.user.telephone;
                });
                this.setState({
                    // 翻页
                    pagination: pagination(data, (current) => {//改变页码
                        this.params.currentPage = current;
                        this.requestList();
                    }, (size) => {//pageSize 变化的回调
                        this.params.pageSize = size;
                        this.requestList();
                    }),
                    data: content
                })
            })
            .catch(err => {
                console.log('fetch error', err)
            });
    }

    render() {

        const columns = [{
            title: '序号',
            dataIndex: 'caseId',
        }, {
            title: '柜子编号',
            dataIndex: 'caseCode',
        }, {
            title: '柜子名称',
            dataIndex: 'caseName',
        }, {
            title: '所属仓库',
            dataIndex: 'beWarehouseName',
        }, {
            title: '容量',
            dataIndex: 'cellCount',
        }, {
            title: '运维人',
            dataIndex: 'ywName',
        }, {
            title: '联系方式',
            dataIndex: 'phoneNum',
        }, {
            title: '柜子地址',
            dataIndex: 'caseAddress',
        }, {
            title: '柜子状态',
            dataIndex: 'status'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`${this.props.match.url}/changeCabinet/${record.caseId}`}>修改</Link>
                    <Divider type="vertical" />
                    {/* eslint-disable-next-line */}
                    <a href="javascript:;" onClick={this.showConfirm}>删除</a>
                    <Divider type="vertical" />
                    {/* eslint-disable-next-line */}
                    <a href="javascript:;">格子管理</a>
                </span>
            ),
        }];

        const { data } = this.state;
        // console.log(data)
        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="机柜管理" />
                <Card
                    title="机柜管理"
                >
                    <SearchForm /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary"><Link to={`${this.props.match.url}/addCabinet`}>新增</Link></Button>
                    </div>
                    <Table className="infoC-table"
                        columns={columns}
                        dataSource={data}
                        // 翻页
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
            </React.Fragment>
        );
    };
}

export default StaffM;
