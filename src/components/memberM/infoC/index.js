
import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, Divider, Pagination } from 'antd';
import './index.less';
import pagination from '../../pagination';
import Url from '../../../api/config';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import moment from 'moment';

//状态
const statusConfig = {
    "0": "正常",
    "1": "冻结",
    "2": "注销"
}

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

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${Url}/vip/userinfos?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
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
                        key: i.userId,
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        let id = 0;
        const columns = [
            { title: '会员ID', dataIndex: 'userId' },
            { title: '绑定手机号', dataIndex: 'mobilePhone' },
            { title: '昵称', dataIndex: 'nickname' },
            { title: '状态', dataIndex: 'status', render:(status)=>statusConfig[status]},
            { title: '类型', dataIndex: 'type', render:(text, record)=>record.bsFamilyinfo? "家庭":"个人" },
            { title: '所属城市', dataIndex: 'city' },
            { title: '所属大客户', dataIndex: 'customer' },
            { title: '所属加盟商', dataIndex: 'company'},
            { title: '注册时间', dataIndex: 'registerDate', render:(time)=>moment(time).format("YYYY-MM-DD HH:mm:ss")},
            {
                title: '操作', dataIndex: 'action',
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
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
            </div>

        )
    }
}

export default InfoC;