import React from 'react';
import { Input, Form, Select, DatePicker, Switch, Upload, Button, Icon,InputNumber } from "antd";

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

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export const getFormItem = (form, formList) => {
    const { getFieldDecorator } = form;
    const formItemList = [];
    if (formList && formList.length > 0) {
        formList.map(item => {
            let label = item.label;
            let name = item.name;
            let initialValue = item.initialValue ;
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
                            {getFieldDecorator(name, { initialValue: initialValue})(
                               
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
                                    <InputNumber/>
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
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "SWITCH":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
                            {
                                getFieldDecorator(name, { valuePropName: 'checked',initialValue: initialValue })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "TEXTAREA":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
                            {
                                getFieldDecorator(name)(
                                    <TextArea disabled={disabled} style={{ width: width }} />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "UPLOAD":
                    formItemList.push(
                        <FormItem label={label} key={name} {...formItemLayout}>
                            {getFieldDecorator(name, {
                                valuePropName: 'fileList',
                            })(
                                <Upload action="/upload.do" listType="picture">
                                    <Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>
                                </Upload>
                            )}
                        </FormItem>
                    );
                    break;
                default:
                    return null
            }
        })
        return formItemList;
    }
}