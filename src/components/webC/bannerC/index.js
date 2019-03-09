import React from 'react';
import { Card, Form, Button, Table, Input, Select, Popconfirm, InputNumber, Switch, Divider, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem, getOptionList } from '../../baseFormItem';
import "./index.less"

const confirm = Modal.confirm;
const BannerSearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'SELECT', label: '投放位置', name: 'location', width: '200px', list: [{ id: '1', name: '首页banner' }] },
                { type: 'INPUT', placeholder: '按名字关键字模糊查询', name: 'fuzzyQuery', width: '300px' },
            ];
            return (
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {getFormItem(form, formList)}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = (item, name) => {
        if (item.type === 'INPUT') {
            return <Input autoFocus={name === 'barCode'} />;
        } else if (item.type === 'SELECT') {
            return <Select style={{ width: '100%' }}>
                {getOptionList(item.list)}
            </Select>;
        } else if (item.type === 'INPUTNUMBER') {
            return <InputNumber />;
        } else if (item.type === 'SWITCH') {
            return <Switch />
        }
    };

    render() {
        const {
            editing,
            dataIndex,
            inputItem,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? <FormItem style={{ margin: 0 }}>
                                {getFieldDecorator(dataIndex, {
                                    valuePropName: (inputItem.type === 'SWITCH' ? 'checked' : 'value'),
                                    initialValue: record[dataIndex],
                                    rules: inputItem.rules || [],
                                })(this.getInput(inputItem, dataIndex))}
                            </FormItem> : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


class BannerC extends React.Component {

    state = {
        data: [{ key: 0, orderState: 1 }, { key: 1, orderState: 2 }, { key: 2, orderState: 3 },],
        editingKey: '',
        count: 3
    }

    columns = [
        { title: 'ID', dataIndex: 'id', width: '6%', render: (text, record, index) => index + 1 },
        { title: 'banner名称', dataIndex: 'name', width: '14%', editable: true },
        {
            title: '投放位置', dataIndex: 'location', width: '14%', editable: true,
            render: (text) => {
                let _index = -1;
                const list = this.inputItem.location.list;
                list.forEach((i, index) => {
                    if (i.id == text) {
                        _index = index
                    }
                })
                return _index > -1 ? list[_index].name : '';
            }
        },
        { title: '状态', dataIndex: 'state', width: '6%', editable: true, render: (bool) => (bool ? '启用' : '禁用') },
        { title: '排序', dataIndex: 'index', width: '6%', editable: true },
        { title: '链接', dataIndex: 'link', width: '30%', editable: true },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a
                                            href="javascript:;"
                                            onClick={() => this.handleSave(form, record.key)}
                                            style={{ marginRight: 8 }}
                                        >保存</a>
                                    )}
                                </EditableContext.Consumer>
                                <Divider type="vertical" />
                                <a onClick={() => this.handleCancel(record.key)}>取消</a>
                            </span>
                        ) : (
                                <span>
                                    <a onClick={() => this.handleEdit(record.key)}>修改</a>
                                    <Divider type="vertical" />
                                    <Popconfirm
                                        title="是否确定删除?"
                                        onConfirm={() => this.handleDelete(record.key)}
                                    >
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>
                            )}
                    </div>
                );
            },
        },
    ];

    inputItem = {
        'name': { type: 'INPUT', rules: [{ required: true, message: 'null' }] },
        'location': { type: 'SELECT', list: [{ id: '1', name: '首页banner' }] },
        'state': { type: 'SWITCH' },
        'index': { type: 'INPUTNUMBER' },
        'link': { type: 'INPUT', rules: [{ required: true, message: 'null' }] },
    }

    isEditing = record => record.key === this.state.editingKey;

    handleSubmit = (params) => {
        console.log(params);
    }

    handleAdd = () => {
        const { count, data } = this.state;
        const newData = {
            key: count,
        };
        this.setState({
            data: [...data, newData],
            count: count + 1,
        });
    }
    handleDelete = (key) => {
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }

    handleCancel = () => {
        this.setState({ editingKey: '' });
    };

    handleSave(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            confirm({
                title: `是否确定${row.state ? "启用" : "禁用"}？`,
                okText: '确定',
                cancelText: '取消',
                onOk: ()=>{
                    const index = newData.findIndex(item => key === item.key);
                    if (index > -1) {
                        const item = newData[index];
                        newData.splice(index, 1, {
                            ...item,
                            ...row,
                        });
                        this.setState({ data: newData, editingKey: '' });
                    } else {
                        newData.push(row);
                        this.setState({ data: newData, editingKey: '' });
                    }
                },
                onCancel:()=> {
                    console.log('Cancel');
                },
            });

        });
    }

    handleEdit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputItem: this.inputItem[col.dataIndex],
                    dataIndex: col.dataIndex,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div className="" >
                <BreadcrumbCustom first="网站管理" second="banner管理" />
                <Card
                    title="banner管理"
                >
                    <BannerSearch handleSubmit={this.handleSubmit} />
                    <div style={{ textAlign: 'left' }}>
                        <Button type="primary" onClick={this.handleAdd}>新增</Button>
                    </div><br />
                    <Table
                        className="bannerC-table"
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50'],
                            onChange: this.cancel,
                        }}
                    />
                </Card>
            </div>
        )
    }
}

export default BannerC;