
import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, Divider, Pagination } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import { fetchGet } from '../../../axios/tools';

const { Option } = Select;
const { RangePicker } = DatePicker;

const MemberSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            key: 1,
            label: "类型",
            placeholder: "全部",
            name: "type",
            value: ['1', '2']
        }, {
            key: 2,
            label: "状态",
            placeholder: "全部",
            name: "state",
            value: ['1', '2']
        }, {
            key: 3,
            label: "大客户",
            placeholder: "全部",
            name: "customer",
            value: ['1', '2']
        }, {
            key: 4,
            label: "加盟商",
            placeholder: "全部",
            name: "company",
            value: ['1', '2']
        }, {
            key: 5,
            label: "城市",
            placeholder: "全部",
            name: "city",
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
                <Form.Item label="注册时间">
                    {getFieldDecorator('registerTime')(
                        <RangePicker />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('nickOrPhone')(
                        <Input placeholder="昵称/手机号模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class InfoC extends React.Component {
    state = {}

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetchGet({
            url: '/memberM/info/list',
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
            title: '会员ID',
            dataIndex: 'memberId',
        }, {
            title: '绑定手机号',
            dataIndex: 'phone',
        }, {
            title: '昵称',
            dataIndex: 'nickName',
        }, {
            title: '状态',
            dataIndex: 'state',
        }, {
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '所属城市',
            dataIndex: 'city',
        }, {
            title: '所属大客户',
            dataIndex: 'customer',
        }, {
            title: '所属加盟商',
            dataIndex: 'company',
        }, {
            title: '注册时间',
            dataIndex: 'registerTime',
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`${this.props.match.url}/infodetail/${record.memberId}`}>查看</Link>
                    <Divider type="vertical" />
                    <a href="javascript:;">删除</a>
                </span>
            ),
        }];

        return (
            <div className="">
                <BreadcrumbCustom first="会员管理" second="信息管理" />
                <Card
                    title="信息管理"
                >
                    <MemberSearchForm />
                    <div style={{ textAlign: 'right' }}><Button onClick={this.handleReset}>导入会员</Button></div><br />
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

export default InfoC;