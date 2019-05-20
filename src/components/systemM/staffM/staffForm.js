import React from 'react';
import { Row, Col, Form, Button, Input, Select, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import URL from '../../../api/config';

const TextArea = Input.TextArea;
const Option = Select.Option;
const StaffForm = Form.create()(
    class extends React.Component {

        state = {
            roleValue: [],
            beInstitutionValue: [],
            beDepartmentValue: []
        }

        componentDidMount() {
            console.log(this.props.initialValues)
            this.requestInfoList();
        }

        onSubmit = (e) => {
            const { type } = this.props;
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    // console.log('Received values of form: ', values);
                    fetch(`${URL}/system/users`, {
                        method: `${type === 'change' ? 'PUT' : 'POST'}`,
                        headers: {
                            'Accept': 'application/json', 'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            beDepartment: {
                                id: parseInt(values.beDepartment)
                            },
                            beInstitution: {
                                id: parseInt(values.beInstitution)
                            },
                            roleId: parseInt(values.role),
                            password: values.password,
                            status: parseInt(values.status),
                            telephone: values.telephone,
                            userName: values.userName
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (!data.code) {
                                message.success(`${type === 'change' ? '修改' : '新增'}成功`);
                                this.props.history.push('/app/systemM/staffM');
                            } else {
                                message.error(`${data.message}`);
                            }
                        })
                        .catch(err => console.log(err));
                }
            });
        }

        requestInfoList = () => {
            fetch(`${URL}/system/systeminfos`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.setState({
                        beDepartmentValue: data.department,
                        beInstitutionValue: data.institution,
                        roleValue: data.role
                    });
                })
                .catch(err => console.log(err));
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 1, label: '员工姓名', name: 'userName', width: '150px', placeholder: '请输入员工姓名' },
                { type: 4, label: '登录密码', name: 'password', width: '150px', placeholder: '请输入登录密码', hidden: true },
                { type: 2, label: '状态', name: 'status', width: '150px', value: [{ id: 1, name: '正常' }, { id: 0, name: '异常' }] },
                { type: 2, label: '角色', name: 'role', width: '150px', value: this.state.roleValue },
                { type: 3, label: '手机号', name: 'telephone', width: '250px', placeholder: '请输入手机号码' },
                { type: 2, label: '所属机构', name: 'beInstitution', width: '300px', value: this.state.beInstitutionValue },
                { type: 2, label: '所属部门', name: 'beDepartment', width: '300px', value: this.state.beDepartmentValue },
            ];
            return (
                <Form onSubmit={this.onSubmit}><Row>
                    {formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12} hidden={this.props.type === 'change' ? i.hidden : false}>
                            <Form.Item {...formItemLayout} label={i.label} help={i.help}>
                                {getFieldDecorator(i.name, {
                                    initialValue: initial ? initial[i.name] : null,
                                    rules: [
                                        {
                                            required: i.name === 'userName' ? true : false,
                                            message: '员工姓名不能为空'
                                        },
                                        {
                                            required: i.name === 'telephone' ? true : false,
                                            message: '手机号不能为空'
                                        },
                                        {
                                            pattern: i.name === 'telephone' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入正确的电话号码'
                                        }
                                    ]
                                })((() => {
                                    switch (i.type) {
                                        case 1:
                                            return <Input placeholder={i.placeholder} style={{ width: `${i.width}` }} />
                                        case 2:
                                            return <Select style={{ width: `${i.width}` }}>
                                                {i.value.map(v => (<Option key={v.id} value={`${v.id}`}>{v.name}</Option>))}
                                            </Select>
                                        case 3:
                                            return <Input placeholder={i.placeholder} style={{ width: `${i.width}` }} />
                                        case 4:
                                            return <Input placeholder={i.placeholder} type="password" style={{ width: `${i.width}` }} />
                                        default:
                                            return null
                                    }
                                })())}
                            </Form.Item>
                        </Col>
                    ))}
                    <Col span={24}>
                        <Form.Item label="备注">
                            {getFieldDecorator('remark', { initialValue: initial ? initial['remark'] : null })(
                                <TextArea placeholder="请输入备注" rows={3} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                    <Row hidden={this.props.type === 'change' ? false : true}>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="注册时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['createTime'] : null}</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="最近修改时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['modifyTime'] : null}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button type="primary"><Link to="/app/systemM/staffM">取消</Link></Button>
                    </div>
                </Form>
            );
        }
    }
);

export default withRouter(StaffForm);
