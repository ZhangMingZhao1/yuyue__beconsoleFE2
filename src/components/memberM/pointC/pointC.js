import React from 'react';
import { Card, Select, DatePicker, Button, Form, Input, Table, Modal, Row, Col, message } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import Url from '../../../api/config';
import pagination from '../../pagination';
import moment from 'moment';
import { getFormItem } from '../../baseFormItem';
import AccountSearchModal from './AccountSearchModal';
import PointAlterModal from './PointAlterModal';
import { parseParams } from '../../../axios/tools';

//积分类型
export const typeConfig = {
    "0": "增加",
    "1": "减少",
    "2": "冻结",
}

//条件查询Form
const PointSearchForm = Form.create()(
    class extends React.Component {
        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let time = values.time;
                    let starttime = time && time.timeRange && time.timeRange[0] && time.timeRange[0].valueOf();
                    let endtime = time && time.timeRange && time.timeRange[0] && time.timeRange[1].valueOf();
                    let data = {
                        ...values,
                        starttime: starttime || '',
                        endtime: endtime || '',
                        keyword: values.keyword || '',
                    };
                    delete data.time;
                    this.props.onSearch(data);
                }
            })
        }
        render() {
            const { form } = this.props;
            const typeList = [{ id: "", name: "全部" }];
            for (let val in typeConfig) {
                typeList.push({ id: val, name: typeConfig[val] })
            }
            const formList = [
                { type: 'SELECT', label: '类型', name: 'type', width: '100px', list: typeList },
                { type: 'SELECT', label: '状态', name: 'status', width: '100px' },
                { type: 'RANGPICKER', label: '时间', name: 'time' },
                { type: 'INPUT', label: '', name: 'keyword', placeholder: "昵称/帐号/订单编号/流水号模糊查询", width: '300px' },
            ];
            return (
                <Form layout="inline">
                    {getFormItem(form, formList)}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

class PointC extends React.Component {
    state = {
        accountSearchModal: false,//账号搜索弹框
        pointAlterModal: false,//积分变更弹框
        pointAlterData: {},//积分变更弹框数据
    };

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
        /**搜索参数 */
        search: {},
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
        fetch(`${Url}/vip/usercredits?${parseParams(params)}`, { credentials: 'include' })
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
                        key: i.usercreditId,
                        mobilePhone: i.bsUserinfo.mobilePhone,
                        nickname: i.bsUserinfo.nickname,
                        point: i.bsUserinfo.point,
                        freezePoint: i.bsUserinfo.freezePoint,
                        createTime: moment(i.createTime),
                        operatieTime: moment(i.operatieTime),
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    /**
     * 条件查询
     */
    handleSearch = (data) => {
        this.params.search = data;
        console.log(data);
        this.requestList();
    }

    /**
     * "下一步"按钮 in 账号搜索弹框
     */
    handleNext = (accountData) => {
        this.setState({ pointAlterData: accountData, accountSearchModal: false, pointAlterModal: true });
    }

    /**
     * 修改积分
     */
    handleAlterPoint = (data) => {
        console.log(data);
        fetch(`${Url}/vip/usercredits/${data.userId}/${data.type}/${data.credit}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("修改积分成功 " + JSON.stringify(result.data))
                this.setState({ pointAlterModal: false });
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const columns = [
            { title: '时间', dataIndex: 'createTime', render: (createTime) => createTime.format("YYYY-MM-DD HH:mm:ss") },
            { title: '会员账号', dataIndex: 'mobilePhone' },
            { title: '会员昵称', dataIndex: 'nickname' },
            { title: '类型', dataIndex: 'type', render: (type) => typeConfig[type] },
            { title: '积分', dataIndex: 'creditValue' },
            { title: '积分余额', dataIndex: 'point' },
            { title: '冻结积分', dataIndex: 'freezePoint' },
            { title: '原因', dataIndex: 'remark' },
            { title: '操作人', dataIndex: 'operatorId' },
            { title: '操作时间', dataIndex: 'operatieTime', render: (operatieTime) => operatieTime.format("YYYY-MM-DD HH:mm:ss") }
        ];

        return (
            <div className="">
                <BreadcrumbCustom first="会员管理" second="积分管理" />
                <Card
                    title="积分管理"
                >
                    <PointSearchForm onSearch={this.handleSearch} />
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={() => { this.setState({ accountSearchModal: true }) }} type="primary">手工增减积分</Button>
                    </div><br />
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                    <AccountSearchModal
                        visible={this.state.accountSearchModal}
                        onCancel={() => { this.setState({ accountSearchModal: false }) }}
                        onNext={this.handleNext}
                    />
                    <PointAlterModal
                        dataSource={this.state.pointAlterData}
                        visible={this.state.pointAlterModal}
                        onCancel={() => { this.setState({ pointAlterModal: false }) }}
                        onSubmit={this.handleAlterPoint}
                    />
                </Card>
            </div>
        );
    }
}
export default PointC;