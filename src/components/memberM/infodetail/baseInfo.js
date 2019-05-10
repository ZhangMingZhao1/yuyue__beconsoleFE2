import React from 'react';
import { Form, Col, Row, Button, Input, Cascader } from 'antd';
import { getFormItem } from '../../baseFormItem';
const InputGroup = Input.Group;

//居住地址输入框
class AddressInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            addrCity: value.addrCity,
            addrDet: value.addrDet,
        };
    }

    handleCityChange = (addrCity) => {
        if (!('value' in this.props)) {
            this.setState({ addrCity });
        }
        this.triggerChange({ addrCity });
    }

    handleDetChange = (e) => {
        if (!('value' in this.props)) {
            this.setState({ addrDet: e.target.value });
        }
        this.triggerChange({ addrDet: e.target.value });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const state = this.state;
        const { disabled } = this.props;
        const options = [{
            value: 'zhejiang',
            label: '浙江省',
            children: [{
                value: '杭州市',
                label: 'Hangzhou',
            }],
        }, {
            value: 'Jiangsu',
            label: '江苏省',
            children: [{
                value: 'nanjing',
                label: '南京市',
            }],
        }];

        return (
            <InputGroup compact>
                <Cascader
                    disabled={disabled}
                    style={{ width: '25%' }}
                    options={options}
                    onChange={this.handleCityChange}
                    displayRender={(label) => (label.join(''))}
                />
                <Input
                    disabled={disabled}
                    style={{ width: '60%' }}
                    defaultValue="Xihu District, Hangzhou"
                    value={state.addrDet}
                    onChange={this.handleDetChange}
                />
            </InputGroup>
        );
    }
}

class BaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            editable: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 24
            },
            wrapperCol: {
                span: 18
            },
        }
        const formList = [
            { type: 'INPUT', label: '用户名', name: 'userName' },
            { type: 'INPUT', label: '姓名', name: 'name', formItemLayout: formItemLayout },
            { type: 'RADIO', label: '性别', name: 'sex', list: [{ id: '男', name: '男' }, { id: '女', name: '女' }], initialValue: '男' },
            { type: 'INPUT', label: '证件号（身份证）', name: 'idCard' },
            { type: 'INPUT', label: '手机号', name: 'phoneName' },
            { type: 'INPUT', label: '婚姻', name: 'marriage' },
            { type: 'INPUT', label: '邮箱', name: 'eMail' },
            { type: 'INPUTNUMBER', label: '年龄', name: 'age' },
            { type: 'SELECT', label: '状态', name: 'state' },
            { type: 'OTHER', label: '居住地址', name: 'address', component: <AddressInput disabled={!this.state.editable} /> },
            { type: 'DATEPICKER', label: '注册时间', name: 'registerTime' },
            { type: 'SELECT', label: '所属城市', name: 'city' },
            { type: 'SELECT', label: '所属加盟商', name: 'company' },
            { type: 'SELECT', label: '所属大客户', name: 'customer' },
            { type: 'UPLOAD', label: '', name: 'headImg', width: '100px' },
            { type: 'TEXTAREA', label: '个性签名', name: 'signature', row: 3 },
        ].map((i, index, arr) => { 
            i.disabled = !this.state.editable; 
            if(index<arr.length-2) i.formItemLayout = formItemLayout; 
            return i; 
        });

        const { form } = this.props;
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={18}>
                            <Row>
                                {getFormItem(form, formList.slice(0, -2)).map((item, index) => (
                                    formList[index].name === 'address' ? <Col key={index} span={16}>{item}</Col> : <Col key={index} span={8}>{item}</Col>
                                ))}
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Row>
                                {getFormItem(form, formList.slice(-2)).map((item, index) => (
                                    <Col key={index}>{item}</Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'center' }}>
                        {
                            this.state.editable ?
                                <Button type="primary" onClick={() => { this.setState({ editable: false }) }} htmlType="submit">保存</Button> :
                                <Button type="primary" onClick={() => { this.setState({ editable: true }) }}>修改</Button>
                        }
                    </div>

                </Form>
            </div>
        );
    }
}
export default Form.create()(BaseInfo);