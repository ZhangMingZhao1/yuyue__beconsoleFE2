import React from 'react';
import { Form, Col, Row, Upload, Button, Icon, message, Input, Cascader } from 'antd';
import { getFormItem } from '../../baseFormItem';
const InputGroup = Input.Group;
const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => callback(reader.result));
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

const formItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 18
    },
}

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
                    style={{ width: '25%' }}
                    options={options}
                    onChange={this.handleCityChange}
                    displayRender={(label) => (label.join(''))}
                />
                <Input
                    style={{ width: '60%' }}
                    defaultValue="Xihu District, Hangzhou"
                    value={state.addrDet}
                    onChange={this.handleDetChange}
                />
            </InputGroup>
        );
    }
}

const formList = [
    { type: 'INPUT', label: '用户名', name: 'userName', formItemLayout: formItemLayout },
    { type: 'INPUT', label: '姓名', name: 'name', formItemLayout: formItemLayout },
    { type: 'RADIO', label: '性别', name: 'sex', list: [{ id: '男', name: '男' }, { id: '女', name: '女' }], initialValue: '男', formItemLayout: formItemLayout },
    { type: 'INPUT', label: '证件号（身份证）', name: 'idCard', formItemLayout: formItemLayout },
    { type: 'INPUT', label: '手机号', name: 'phoneName', formItemLayout: formItemLayout },
    { type: 'INPUT', label: '婚姻', name: 'marriage', formItemLayout: formItemLayout },
    { type: 'INPUT', label: '邮箱', name: 'eMail', formItemLayout: formItemLayout },
    { type: 'INPUTNUMBER', label: '年龄', name: 'age', formItemLayout: formItemLayout },
    { type: 'SELECT', label: '状态', name: 'state', formItemLayout: formItemLayout },
    { type: 'OTHER', label: '居住地址', name: 'address', component: <AddressInput />, formItemLayout: formItemLayout },
    { type: 'DATEPICKER', label: '注册时间', name: 'registerTime', formItemLayout: formItemLayout },
    { type: 'SELECT', label: '所属城市', name: 'city', formItemLayout: formItemLayout },
    { type: 'SELECT', label: '所属加盟商', name: 'company', formItemLayout: formItemLayout },
    { type: 'SELECT', label: '所属大客户', name: 'customer', formItemLayout: formItemLayout },
];


const FormItem = Form.Item;
class BaseInfo extends React.Component {
    state = {
        loading: false,
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
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
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { form } = this.props;
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={18}>
                            <Row>
                                {getFormItem(form, formList).map((item, index) => (
                                    formList[index].name === 'address' ? <Col key={index} span={16}>{item}</Col> : <Col key={index} span={8}>{item}</Col>
                                ))}
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Row>
                                <FormItem label="">
                                    {form.getFieldDecorator("img", {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: (e)=>{
                                            if (Array.isArray(e)) {
                                                return e;
                                              }
                                              return e && e.fileList;
                                        },
                                    })(
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            showUploadList={false}
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} /> : uploadButton}
                                        </Upload>
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="个性签名">
                                    {form.getFieldDecorator('signature')(
                                        <TextArea rows={3} />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{textAlign: 'center'}}><Button type='primary' htmlType="submit">修改</Button></div>
                </Form>
            </div>
        );
    }
}
export default Form.create()(BaseInfo);