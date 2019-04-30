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
            let name = item.name;
            let initialValue = item.initialValue;
            let placeholder = item.placeholder;
            let width = item.width;
            let disabled = item.disabled;
            let extra = item.extra;
            let rules = item.rules;
            let formItemLayout = item.formItemLayout
            switch (item.type) {
                case "INPUT":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
                            <span style={{ whiteSpace: 'nowrap' }}>
                                {getFieldDecorator(name, { initialValue: initialValue })(

                                    <Input disabled={disabled} placeholder={placeholder} style={{ width: width }} />

                                )}
                                <span style={{ marginLeft: 10 }}>{extra}</span>
                            </span>
                        </FormItem>
                    );
                    break;
                case "SELECT":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
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
                        <FormItem label={label} key={name} {...formItemLayout}>
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
                        <FormItem label={label} key={name} {...formItemLayout}>
                            {
                                getFieldDecorator(name, {
                                    initialValue: initialValue
                                })(
                                    <InputNumber disabled={disabled}/>
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "DATEPICKER":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
                            {
                                getFieldDecorator(name)(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={disabled}/>
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "SWITCH":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
                            {
                                getFieldDecorator(name, { valuePropName: 'checked', initialValue: initialValue })(
                                    <Switch disabled={disabled}/>
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "RADIO":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
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
                        <FormItem label={label} key={name} {...formItemLayout}>
                            {
                                getFieldDecorator(name)(
                                    <TextArea disabled={disabled} style={{ width: width }} row={item.width} />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "UPLOAD":
                    formItemList.push(
                        <MyUpload form={form} label={label} name={name} disabled={disabled} formItemLayout={formItemLayout} initialValue={initialValue} />
                    );
                    break;
                default:
                    let Component = item.component;
                    formItemList.push(
                        Component ? <FormItem label={label} key={name} {...formItemLayout}>
                            {getFieldDecorator(name, {

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
    //hasFile 是否已有图片，保证只能上传一张图片
    state = { previewVisible: false, previewImage: '', hasFile: this.props.initialValue ? true : false }
    //预览
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    //取消模态框
    handleCancel = () => this.setState({ previewVisible: false })
    //上传文件改变时调用
    handleChange = ({ fileList }) => {
        this.setState({hasFile: fileList.length>0? true:false})
    }
    render() {
        const { previewVisible, previewImage } = this.state;
        const { form, label, name, formItemLayout, initialValue, disabled } = this.props;
        return <Form.Item label={label} key={name} {...formItemLayout}>
            {form.getFieldDecorator(name, {
                valuePropName: 'fileList',
                initialValue: initialValue,
                getValueFromEvent: (e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }
            })(
                <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={() => { if(disabled) return false; this.setState({ hasFile: null }); }}
                    disabled={disabled}
                >
                    {
                        this.state.hasFile ?
                            null :
                            <Icon type="plus" />
                    }
                </Upload>
            )}
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Form.Item>
    }
}

