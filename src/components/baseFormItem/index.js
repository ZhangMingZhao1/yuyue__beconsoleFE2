import React from 'react';
import { Input, Form, Select, DatePicker } from "antd";

const Option = Select.Option;
function getOptionList(data) {
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
            let initialValue = item.initialValue || '';
            let placeholder = item.placeholder;
            let width = item.width;
            let disabled = item.disabled;
            let extra = item.extra ;
            switch (item.type) {
                case "INPUT":
                    formItemList.push(
                        <FormItem label={label} key={name}>
                            {getFieldDecorator(name)(
                                <span style={{whiteSpace:'nowrap'}}>
                                    <Input disabled={disabled} placeholder={placeholder} style={{ width: width }} />
                                    <span style={{marginLeft: 10 }}>{extra}</span>
                                </span>
                            )}
                        </FormItem>
                    );
                    break;
                case "SELECT":
                    formItemList.push(
                        <FormItem label={label} key={name}>
                            {
                                getFieldDecorator(name, {
                                    initialValue: initialValue
                                })(
                                    <Select
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
                        <FormItem label={label} key={name}>
                            {
                                getFieldDecorator(name)(
                                    <RangePicker />
                                )
                            }
                        </FormItem>
                    );
                    break;
                case "TEXTAREA":
                    formItemList.push(
                        <FormItem label={label} key={name}>
                            {
                                getFieldDecorator(name)(
                                    <TextArea style={{ width: width }}/>
                                )
                            }
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