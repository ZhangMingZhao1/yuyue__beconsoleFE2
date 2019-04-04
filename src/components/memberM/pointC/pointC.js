import React from 'react';
import { Card, Select, DatePicker, Button, Form, Input, Table, Modal, Row, Col } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { fetchGet } from '../../../axios/tools';

const { Option } = Select;
const { RangePicker } = DatePicker;

function validateAccount(account) {
    if (!account || account === '') {
        return {
            validateStatus: 'error',
            errorMsg: 'please input an existed Account!',
        };
    }
    return {
        validateStatus: 'success',
        errorMsg: null
    };
}

const AccountSearchForm = Form.create({ name: 'account_search_form' })(
    class extends React.Component {
        state = {
            account: {},
        };

        next = () => {
            const value = this.props.form.getFieldValue('account');
            this.setState({
                account: {
                    ...validateAccount(value)
                },
            }, () => {
                if (value && this.state.account.validateStatus === 'success')
                    this.props.onNext()
            });
        }

        render() {
            const { visible, onCancel } = this.props;
            const { getFieldDecorator } = this.props.form;
            const account = this.state.account;
            return (
                <Modal
                    visible={visible}
                    onCancel={onCancel}
                    footer={null}
                >
                    <Form layout="horizontal">
                        <Form.Item
                            label="会员账号" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}
                            validateStatus={account.validateStatus}
                            help={account.errorMsg || null}
                            required={true}
                        >
                            {getFieldDecorator('account')(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <p style={{ textAlign: 'center' }}><Button type="primary" htmlType='submit' onClick={this.next}>下一步</Button></p>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const PointAlterForm = Form.create({ name: 'point_alter_form' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, dataSource } = this.props;
            const { getFieldDecorator } = this.props.form;
            const title = [
                <Row style={{lineHeight: 2}}><Col span={12}>会员账号：{dataSource.account}</Col><Col span={12}>昵称：{dataSource.nickName}</Col></Row>,
                <Row style={{lineHeight: 2}}><Col span={12}>积分余额：{dataSource.balance}</Col><Col span={12}>冻结积分：{dataSource.frozen}</Col></Row>
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

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetchGet({
            url: '/memberM/pointC',
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
        const columns = [{
            title: '时间',
            dataIndex: 'time',
        }, {
            title: '会员账号',
            dataIndex: 'account',
        }, {
            title: '会员昵称',
            dataIndex: 'nickName',
        }, {
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '积分',
            dataIndex: 'point',
        }, {
            title: '积分余额',
            dataIndex: 'balance',
        }, {
            title: '冻结积分',
            dataIndex: 'frozen',
        }, {
            title: '原因',
            dataIndex: 'reason',
        }, {
            title: '操作人',
            dataIndex: 'operator',
        }, {
            title: '操作时间',
            dataIndex: 'operationTime'
        }];

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
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
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