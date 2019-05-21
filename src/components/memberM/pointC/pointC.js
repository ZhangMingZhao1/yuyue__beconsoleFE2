import React from 'react';
import { Card, Select, DatePicker, Button, Form, Input, Table, Modal, Row, Col } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import Url from '../../../api/config';
import pagination from '../../pagination';
import moment from 'moment';
import { getFormItem } from '../../baseFormItem';

//积分类型
const typeConfig = {
    "0": "增加",
    "1": "减少",
    "2": "冻结",
}

const { Option } = Select;
const { RangePicker } = DatePicker;

//会员账号搜索弹框
const AccountSearchForm = Form.create({ name: 'account_search_form' })(
    class extends React.Component {
        state = {}
        handleNext = () => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.setState({ loading: true })
                    setTimeout(() => {
                        this.setState({ loading: false }, () => { this.props.onNext() })
                    }, 1000);
                }
            })
        }
        render() {
            const { visible, onCancel, form } = this.props;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
            const formList = [{
                type: 'INPUT', label: '会员账号', name: 'account', formItemLayout: formItemLayout, rules: [
                    { required: true, message: 'Please input your username!' },
                ],
            }];
            return (
                <Modal
                    visible={visible}
                    onCancel={onCancel}
                    footer={<p style={{ textAlign: 'center' }}>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleNext}>下一步</Button>
                    </p>}
                >
                    <Form >
                        <Row>
                            {getFormItem(form, formList).map((item, index) => (
                                <Col key={index}>
                                    {item}
                                </Col>
                            ))}
                        </Row>
                    </Form>
                </Modal>
            );
        }
    }
);

//变更积分弹框
const PointAlterForm = Form.create({ name: 'point_alter_form' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, dataSource } = this.props;
            const { getFieldDecorator } = this.props.form;
            const title = [
                <Row style={{ lineHeight: 2 }}><Col span={12}>会员账号：{dataSource.account}</Col><Col span={12}>昵称：{dataSource.nickName}</Col></Row>,
                <Row style={{ lineHeight: 2 }}><Col span={12}>积分余额：{dataSource.balance}</Col><Col span={12}>冻结积分：{dataSource.frozen}</Col></Row>
            ];
            const selectData = {
                label: "类型",
                defaultValue: 'add',
                name: "type",
                value: [{ v: 'add', t: '增加' }, { v: 'sub', t: '减少' }, { v: 'fro', t: '冻结' }]
            };
            return (
                <Modal
                    visible={visible}
                    onCancel={onCancel}
                    footer={null}
                    title={title}
                >
                    <Form layout="horizontal">
                        <Form.Item
                            label={selectData.label} labelCol={{ span: 10 }} wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator(selectData.name)(
                                <Select style={{ width: 120 }} >
                                    {selectData.value.map(i => (
                                        <Option key={i.v} value={i.v}>{i.t}</Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="积分" labelCol={{ span: 10 }} wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('point')(
                                <Input style={{ width: 120 }} />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <p style={{ textAlign: 'center' }}><Button type="primary">确定</Button></p>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const PointSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            label: "类型",
            placeholder: "全部",
            name: "type",
            value: ['1', '2']
        }, {
            label: "状态",
            placeholder: "全部",
            name: "state",
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
                <Form.Item label="时间">
                    {getFieldDecorator('time')(
                        <RangePicker />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery')(
                        <Input style={{ width: 250 }} placeholder="昵称/账号/订单编号/流水号模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class PointC extends React.Component {
    state = {
        modal1: false,
        modal2: false,
    };

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${Url}/vip/usercredits?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
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

    showModal = (key) => {
        this.setState({ [key]: true });
    }

    handleCancel = (key) => {
        this.setState({ [key]: false });
    }

    handleModal1 = () => {
        const form = this.account_formRef.props.form;
        console.log(form.getFieldValue('account'));
        this.setState({ modal1: false, modal2: true });
    }

    accountFormRef = (formRef) => {
        this.account_formRef = formRef;
    }

    pointAlterForm = (formRef) => {
        this.point_formRef = formRef;
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

        const addData = { account: '13476437878', nickName: '张三', balance: '123', frozen: '0' };
        return (
            <div className="">
                <BreadcrumbCustom first="会员管理" second="积分管理" />
                <Card
                    title="积分管理"
                >
                    <PointSearchForm />
                    <div style={{ textAlign: 'right' }} onClick={this.showModal.bind(this, "modal1")}><Button>手工增减积分</Button></div><br />
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered
                    />
                    <AccountSearchForm
                        wrappedComponentRef={this.accountFormRef}
                        visible={this.state.modal1}
                        onCancel={this.handleCancel.bind(this, 'modal1')}
                        onNext={this.handleModal1}
                    />
                    <PointAlterForm
                        wrappedComponentRef={this.pointAlterForm}
                        dataSource={addData}
                        visible={this.state.modal2}
                        onCancel={this.handleCancel.bind(this, 'modal2')}
                        onNext={this.handleModal2}
                    />
                </Card>
            </div>
        );
    }
}
export default PointC;