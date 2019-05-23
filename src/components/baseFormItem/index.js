import React from 'react';
import { Input, Form, Select, DatePicker, Switch, Upload, Icon, InputNumber, Radio, Modal } from "antd";

const Option = Select.Option;
export const getOptionList = (data) => {
    if (!data) {
        return [];
    }
    let options = [];
    data.map((item) => {
        options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options;
}


export const getRadioList = (data) => {
    if (!data) {
        return [];
    }
    let options = [];
    data.map((item) => {
        options.push(<Radio value={item.id} key={item.id}>{item.name}</Radio>)
    })
    return options;
}

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export const getFormItem = (form, formList) => {
    const { getFieldDecorator } = form;
    const formItemList = [];
    if (formList && formList.length > 0) {
        formList.map(item => {
            let label = item.label || '';
            let help = item.help || '';
            let name = item.name;
            let initialValue = item.initialValue;
            let placeholder = item.placeholder;
            let width = item.width;
            let disabled = item.disabled;
            let extra = item.extra;
            let rules = item.rules || [];
            let formItemLayout = item.formItemLayout
            switch (item.type) {
                case "INPUT":
                    formItemList.push(
                        <FormItem label={label} key={name} help={rules ? undefined : help} {...formItemLayout}>
                            <span style={{ whiteSpace: 'nowrap' }}>
                                {getFieldDecorator(name, { initialValue: initialValue, rules: rules })(
                                    <Input disabled={disabled} placeholder={placeholder} style={{ width: width }} />
                                )}
                                <span style={{ marginLeft: 10 }}>{extra}</span>
                            </span>
                        </FormItem>
                    );
                    break;
                case "SELECT":
                    formItemList.push(
                        <FormItem label={label} key={name} help={help} {...formItemLayout}>
                            {
                                getFieldDecorator(name, {
                                    initialValue: initialValue
                                })(
                                    <Select
                                        disabled={disabled}
                                        style={{ width: width }}
                                        placeholder={placeholder}
                                    >
                                        {getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "RANGPICKER":
                    formItemList.push(
                        <FormItem label={label} key={name} help={help} {...formItemLayout}>
                            {
                                getFieldDecorator(name)(
                                    <RangePicker />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "INPUTNUMBER":
                    formItemList.push(
                        <FormItem label={label} key={name} help={rules ? undefined : help} {...formItemLayout}>
                            {
                                getFieldDecorator(name, {
                                    initialValue: initialValue,
                                    rules: rules
                                })(
                                    <InputNumber disabled={disabled} />
                                )
                            }
                            <span style={{ marginLeft: 10 }}>{extra}</span>
                        </FormItem>
                    );
                    break;
                case "DATEPICKER":
                    formItemList.push(
                        <FormItem label={label} key={name} help={help} {...formItemLayout}>
                            {
                                getFieldDecorator(name, {
                                    initialValue: initialValue
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={disabled} />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "SWITCH":
                    formItemList.push(
                        <FormItem label={label} key={name} help={help} {...formItemLayout}>
                            {
                                getFieldDecorator(name, { valuePropName: 'checked', initialValue: initialValue })(
                                    <Switch disabled={disabled} />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "RADIO":
                    formItemList.push(
                        <FormItem label={label} key={name} help={help} {...formItemLayout}>
                            {getFieldDecorator(name, { initialValue: initialValue })(
                                <Radio.Group disabled={disabled}>
                                    {getRadioList(item.list)}
                                </Radio.Group>
                            )}
                        </FormItem>
                    );
                    break;
                case "TEXTAREA":
                    formItemList.push(
                        <FormItem label={label} key={name} help={help} {...formItemLayout}>
                            {
                                getFieldDecorator(name, { initialValue: initialValue })(
                                    <TextArea disabled={disabled} style={{ width: width }} row={item.row} />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "UPLOAD":
                    formItemList.push(
                        <Form.Item label={label} key={name} help={help} {...formItemLayout}>
                            {form.getFieldDecorator(name, {
                                valuePropName: 'fileList',
                                initialValue: {
                                    imageList: (initialValue ? [{
                                        uid: '-1',
                                        name: 'xxx.png',
                                        status: 'done',
                                        url: /^(http)/.test(initialValue) ? initialValue : "http://" + initialValue,
                                    }] : [])
                                },
                                getValueFromEvent: (e) => {
                                    return { imageList: e.imageList };
                                }
                            })(
                                <MyUpload disabled={disabled} />
                            )}
                        </Form.Item>
                    );
                    break;
                default:
                    let Component = item.component;
                    formItemList.push(
                        Component ? <FormItem label={label} help={help} key={name} {...formItemLayout}>
                            {getFieldDecorator(name, {
                                initialValue: initialValue,
                            })(
                                Component
                            )}
                        </FormItem> : null
                    );
            }
        })
        return formItemList;
    }
}

class MyUpload extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('fileList' in nextProps) {
            return {
                ...(nextProps.fileList || {}),
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        const fileList = props.fileList || {};
        this.state = {
            imageList: fileList.imageList,
            previewVisible: false,
            previewImage: '',
        };
    }
    handleChange = ({ fileList }) => {
        if (!('fileList' in this.props)) {
            this.setState({ imageList: fileList });
        }
        this.triggerChange({ imageList: fileList });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, { imageList: this.state.imageList }, changedValue));
        }
    }
    //预览
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    //取消模态框
    handleCancel = () => this.setState({ previewVisible: false })

    render() {
        const { previewVisible, previewImage } = this.state;
        const { disabled } = this.props;
        return <div>
            <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={this.state.imageList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                onRemove={() => { this.handleChange({ fileList: [] }) }}
                disabled={disabled}
            >
                {
                    this.state.imageList.length > 0 ?
                        null :
                        <Icon type="plus" />
                }
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    }
}

