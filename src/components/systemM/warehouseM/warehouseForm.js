import React from 'react';
import { Row, Col, Form, Button, Input, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import URL from '../../../api/config';

const TextArea = Input.TextArea;
const Option = Select.Option;
const BMap = window.BMap;
const WarehouseForm = Form.create()(
    class extends React.Component {

        state = {
            selectData: []
        }

        componentDidMount() {
            // 获取部门信息
            fetch(`${URL}/departments`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        selectData: data
                    })
                })
                .catch(err => {
                    console.log('fetch error', err);
                })
        }

        onSubmit = (e) => {
            const { type } = this.props;
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
                const myGeo = new BMap.Geocoder();
                // 获取地址的经纬度
                myGeo.getPoint(values.warehouseAddress, (point) => {
                    if (point) {
                        //这个point就是解析地址获得的百度地图坐标系
                        console.log(point); //{lat: xx, lng: xx}
                        fetch(`${URL}/warehouses`, {
                            method: `${type === 'change' ? 'PUT' : 'POST'}`,
                            headers: {
                                'Accept': 'application/json', 'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body:
                                JSON.stringify({
                                    warehouseId: this.props.initialValues ? this.props.initialValues.warehouseId : null,
                                    warehouseCode: values.warehouseCode,
                                    latitude: point.lat,
                                    longitude: point.lng,
                                    contacts: values.contacts,
                                    operatorId: parseInt(values.operatorId),
                                    remarks: values.remark,
                                    telephone: values.telephone,
                                    warehouseAddress: values.warehouseAddress,
                                    warehouseName: values.warehouseName,
                                    departmentId: parseInt(values.departmentId)
                                })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (!data.code) {
                                    message.success(`${type === 'change' ? '更新' : '新增'}成功`);
                                    this.props.history.push('/app/systemM/warehouseM');
                                } else {
                                    message.error(`${data.message}`);
                                }
                            })
                            .catch(err => {
                                console.log('fetch error', err);
                            });
                    } else {
                        message.error('仓库地址解析失败');
                    }
                }, values.warehouseAddress);
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
                { type: 3, label: '仓库编号', name: 'warehouseCode', width: '150px', placeholder: '请输入仓库编号' },
                { type: 1, label: '仓库名称', name: 'warehouseName', width: '300px', placeholder: '请输入仓库名称' },
                { type: 2, label: '所属部门', name: 'departmentId', width: '150px', placeholder: '全部', values: this.state.selectData },
                { type: 1, label: '联系人', name: 'contacts', width: '150px', placeholder: '请输入联系人姓名' },
                { type: 3, label: '联系方式', name: 'telephone', width: '150px', placeholder: '请输入联系人电话' },
                { type: 1, label: '地址', name: 'warehouseAddress', width: '300px', placeholder: '省/ 市/ 区' },
                { type: 1, label: '操作员', name: 'operatorId', width: '150px', placeholder: '请输入操作员ID' },
            ];
            return (
                <Form onSubmit={this.onSubmit}><Row>
                    {formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12}>
                            <Form.Item {...formItemLayout} label={i.label} help={i.help}>
                                {getFieldDecorator(i.name, {
                                    initialValue: initial ? initial[i.name] : null,
                                    rules: [
                                        {
                                            required: i.name === 'warehouseCode' ? true : false,
                                            message: '仓库编号不能为空'
                                        },
                                        {
                                            pattern: i.name === 'warehouseCode' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        },
                                        {
                                            pattern: i.name === 'telephone' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        },
                                        {
                                            len: i.name === 'telephone' ? 11 : null,
                                            message: '请输入正确的电话号码'
                                        }
                                    ]
                                })((() => {
                                    switch (i.type) {
                                        case 1:
                                            return (
                                                <Input placeholder={i.placeholder} style={{ width: `${i.width}` }} />
                                            )
                                        case 2:
                                            return <Select placeholder={i.placeholder} style={{ width: `${i.width}` }}>
                                                {i.values.map((v) => (<Option key={v.id} value={`${v.id}`}>{v.name}</Option>))}
                                            </Select>
                                        case 3:
                                            return (
                                                <Input placeholder={i.placeholder} style={{ width: `${i.width}` }} />
                                            )
                                        default:
                                            return null
                                    }
                                })())}
                            </Form.Item>
                        </Col>
                    ))}
                    <Col span={24}>
                        <Form.Item label="备注">
                            {getFieldDecorator('remark', { initialValue: initial ? initial['remarks'] : null })(
                                <TextArea placeholder="请输入备注" rows={3} />
                            )}
                        </Form.Item>
                    </Col>
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
                                <span style={{ marginLeft: 10 }}>{initial ? initial['updateTime'] : null}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button type="primary"><Link to="/app/systemM/warehouseM">取消</Link></Button>
                    </div>
                </Form >
            );
        }
    }
);

export default withRouter(WarehouseForm);
