import React from 'react';
import { Form, Input, Button, Card, Table, Divider, message, Popconfirm, InputNumber } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import Url from '../../../api/config';
import pagination from '../../pagination';
import { getFormItem } from '../../baseFormItem';
const EditableContext = React.createContext();

//顶部查询表单
const GeneSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        return (
            <Form layout="inline">
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery')(
                        <Input placeholder="名称模糊查询" style={{ width: 200 }} />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

//编辑状态时的单元格
class EditableCell extends React.Component {
    getInput = (form) => {
        let { dataIndex, record } = this.props;
        if (dataIndex === "name") {//"名称"栏返回input
            return getFormItem(form, [{ type: 'INPUT', name: dataIndex, initialValue: record && record[dataIndex] }])
        } else {//"排序"栏返回inputNumber
            return getFormItem(form, [{ type: 'INPUTNUMBER', name: dataIndex, initialValue: record && record[dataIndex] }])
        }
    }
    render() {
        const { editing, dataIndex, ...restProps } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    return (
                        <td {...restProps}>
                            {/* 正在编辑？ */}
                            {editing ? this.getInput(form) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

//基因表格
const GeneTable = Form.create()(
    class extends React.Component {
        state = { editingKey: '' };//编辑中的key
        columns = [
            { title: '名称', dataIndex: 'name', editable: true },//editable 会否可编辑
            { title: '排序', dataIndex: 'sort', editable: true },
            {
                title: '操作', dataIndex: 'action', editable: false,
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (//正在编辑？
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}
                                            >保存
                                            </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <a onClick={() => this.cancel(record.key)}>取消</a>
                                </span>
                            ) : (//存在正在编辑行，disabled编辑和删除按钮
                                    <span>
                                        <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>编辑</a>
                                        <Divider type="vertical" />
                                        <a disabled={editingKey !== ''} onClick={() => this.props.onDel(record.key)}>删除</a>
                                    </span>
                                )}
                        </div>
                    );
                },
            }];
        //判断是否是编辑行
        isEditing = record => record.key === this.state.editingKey;
        //取消编辑
        cancel = () => {
            this.setState({ editingKey: '' });
        };
        //保存
        save(form, key) {
            form.validateFields((error, row) => {
                if (error) {
                    return;
                }
                this.props.onSave({ key: key, ...row })
                this.setState({ editingKey: '' })
            });
        }
        //编辑行
        edit(key) {
            this.setState({ editingKey: key });
        }
        render() {
            const { dataSource, pagination } = this.props;
            const components = {
                body: {cell: EditableCell},
            };
            const columns = this.columns.map((col) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: record => ({
                        record,//initialValue=record[dataIndex]
                        editing: this.isEditing(record),//正在编辑？
                        dataIndex: col.dataIndex,//form name
                    }),
                };
            });
            return (
                <EditableContext.Provider value={this.props.form} >
                    <Table
                        className="geneM-Table"
                        components={components}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={pagination}
                        bordered
                    />
                </EditableContext.Provider >
            );
        }
    }
);

class GeneM extends React.Component {
    state = {
        dataSource: [
            { key: 0, name: '文艺', sort: 1 },
            { key: 1, name: '文艺', sort: 1 }
        ],
        addGeneName: '',//新增基因名称
        addGeneSort: '',//新增基因排序
    }

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() { }

    /**
     * 修改基因信息
     */
    handleUpdate = (value) => {
    }

    /**
     * 删除基因信息
     */
    handleDel = (key) => {
    }

    /**
     * 新增基因出版社
     */
    handleAdd = () => {
    }

    render() {
        //新增表单
        const AddInput = <span>
            <font style={{ lineHeight: '50px' }}>名称：</font>
            <Input value={this.state.addGeneName} onChange={(e) => { this.setState({ addGeneName: e.target.value }) }} />
            <br/>
            <font style={{ lineHeight: '50px' }}>排序：</font><br/>
            <InputNumber value={this.state.addGeneSort} onChange={(value) => { this.setState({ addGeneSort: value }) }} />
        </span>
        return (
            <div className="">
                <BreadcrumbCustom first="书籍管理" second="基因维护" />
                <Card
                    title="基因维护"
                >
                    <GeneSearchForm /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Popconfirm icon={null} title={AddInput} placement="right" onConfirm={this.handleAdd} okText="确定" cancelText="取消">
                            <Button type="primary">新增</Button>
                        </Popconfirm>
                    </div>
                    <GeneTable
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                        dataSource={this.state.dataSource}
                        onSave={(v) => { this.handleUpdate(v) }}
                        onDel={(key) => { this.handleDel(key) }}
                    />
                </Card>
            </div>
        )
    }
}

export default GeneM;