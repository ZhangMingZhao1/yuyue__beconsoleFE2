import React from 'react';
import { Row, Col, Form, Button, Input, Select, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import URL from '../../../api/config';

const Option = Select.Option;
const CabinetForm = Form.create()(
    class extends React.Component {

        state = {
            beWarehouseValues: []
        }

        componentDidMount() {
            this.requestBeWarehouseValues();
        }

        requestBeWarehouseValues = () => {
            fetch(`${URL}/system/warehouses`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    const content = data.content;
                    content.map((i) => {
                        i.id = i.warehouseId;
                        i.name = i.warehouseName;
                    });
                    this.setState({
                        beWarehouseValues: content
                    })
                })
        }

        onSubmit = (e) => {
            e.preventDefault();
            const { type } = this.props;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    // TODO 后端还没接口
                    fetch(`${URL}`, {
                        method: `${type === 'change' ? 'PUT' : 'POST'}`,
                        headers: {
                            'Accept': 'application/json', 'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({

                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (!data.code) {
                                message.success(`${type === 'change' ? '更新' : '新增'}成功`);
                                this.props.history.push('/app/systemM/cabinetM');
                            } else {
                                message.error(`${data.message}`);
                            }
                        })
                        .catch(err => {
                            console.log('fetch error', err);
                        });
                }
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 1, label: '柜子编号', name: 'caseCode', width: '150px', required: true },
                { type: 1, label: '柜子名称', name: 'caseName', width: '300px', },
                { type: 2, label: '所属仓库', name: 'beWarehouseId', width: '300px', value: this.state.beWarehouseValues },
                { type: 1, label: '容量', name: 'cellCount', width: '150px' },
                { type: 1, label: '运维人', name: 'ywName', width: '150px', },
                { type: 1, label: '联系方式', name: 'phoneNum', width: '300px' },
                { type: 1, label: '柜子地址', name: 'caseAddress', width: '300px' },
                { type: 2, label: '柜子状态', name: 'status', width: '150px', value: [{ id: 1, name: '正常' }, { id: 0, name: '异常' }] },
                { type: 1, label: '操作员', name: 'operator', width: '150px' },
            ];
            // console.log(initial);
            return (
                <Form onSubmit={this.onSubmit}><Row>
                    {formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12}>
                            <Form.Item {...formItemLayout} label={i.label} help={i.help}>
                                {getFieldDecorator(i.name, {
                                    initialValue: initial ? initial[i.name] : null,
                                    rules: [
                                        {
                                            required: i.name === 'caseCode' ? true : false,
                                            message: '柜子编号不能为空'
                                        },
                                        {
                                            pattern: i.name === 'caseCode' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        },
                                        {
                                            pattern: i.name === 'cellCount' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        },
                                        {
                                            pattern: i.name === 'phoneNum' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        },
                                    ]
                                })((() => {
                                    switch (i.type) {
                                        case 1:
                                            return <Input style={{ width: `${i.width}` }} />
                                        case 2:
                                            return <Select style={{ width: `${i.width}` }}>
                                                {i.value.map(v => (<Option key={v.id} value={`${v.id}`}>{v.name}</Option>))}
                                            </Select>
                                        default:
                                            return null
                                    }
                                })())}
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
                    <Row hidden={this.props.type === 'change' ? false : true}>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="创建时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['createTime'] : null}</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="最近修改时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['date'] : null}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit" >提交</Button>
                        <Button type="primary"><Link to="/app/systemM/cabinetM">取消</Link></Button>
                    </div>
                </Form>
            );
        }
    }
);

export default withRouter(CabinetForm);
