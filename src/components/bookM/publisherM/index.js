import React from 'react';
import { Form, Input, Button, Card, Table, Divider, message, Popconfirm } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import Url from '../../../api/config';
import pagination from '../../pagination';
import { getFormItem } from '../../baseFormItem';
const EditableContext = React.createContext();

const PublisherSearchForm = Form.create()(
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


class EditableCell extends React.Component {
    render() {
        const { editing, dataIndex, record, ...restProps } = this.props;
        const formList = [
            { type: 'INPUT', name: dataIndex, width: '300px', initialValue: record && record[dataIndex] },
        ];
        return (
            <EditableContext.Consumer>
                {(form) => {
                    return (
                        <td {...restProps}>
                            {/* 正在编辑？ */}
                            {editing ? getFormItem(form, formList) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

const PublisherTable = Form.create()(
    class extends React.Component {
        state = { editingKey: '' };//编辑中的key

        columns = [
            { title: 'ID', dataIndex: 'pubId', editable: false },
            { title: '名称', dataIndex: 'pubName', editable: true },//editable 会否可编辑
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
                                                href="javascript:;"
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
                this.props.onSave({ pubId: key, ...row })
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
                body: {
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
                        record,//initialValue=record[dataIndex]
                        editing: this.isEditing(record),//正在编辑？
                        dataIndex: col.dataIndex,//form name
                    }),
                };
            });
            return (
                <EditableContext.Provider value={this.props.form} >
                    <Table
                        className="publisherM-Table"
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

class BookLib extends React.Component {
    state = {
        addPubName: '',//增加出版社名称
    }

    params = {
        currentPage: 1,//当前页面
        pageSize: 10,//每页大小
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${Url}/book/publishinfos?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`, { credentials: 'include' })
            .then((res) => res.json()).then(data => {
                this.setState({
                    pagination: pagination(data, (current) => {//改变页码
                        this.params.currentPage = current;
                        this.requestList();
                    }, (size) => {//pageSize 变化的回调
                        this.params.pageSize = size;
                        this.requestList();
                    }),
                    dataSource: data.content.map(i => ({
                        ...i,
                        key: i.pubId
                    }))
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    /**
     * 修改出版社信息
     */
    handleUpdate = (value) => {
        fetch(`${Url}/book/publishinfos`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(value)
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                console.log(result.data)
                message.success("修改成功 " + JSON.stringify(result.data))
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 删除出版社信息
     */
    handleDel = (key) => {
        fetch(`${Url}/book/publishinfos/${key}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                console.log(result.data)
                message.success("删除" + JSON.stringify(result.data) + "成功")
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 新增出版社
     */
    handleAdd = () => {
        fetch(`${Url}/book/publishinfos`, {
            method: 'Post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ pubName: this.state.addPubName })
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("新增成功 " + JSON.stringify(result.data))
                this.setState({ addPubName: '' })
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const AddInput = <span>
            <font style={{ lineHeight: '50px' }}>出版社名称：</font>
            <Input value={this.state.addPubName} onChange={(e) => { this.setState({ addPubName: e.target.value }) }} />
        </span>
        return (
            <div className="">
                <BreadcrumbCustom first="书籍管理" second="出版社" />
                <Card
                    title="出版社维护"
                >
                    <PublisherSearchForm /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Popconfirm icon={null} title={AddInput} placement="right" onConfirm={this.handleAdd} okText="确定" cancelText="取消">
                            <Button type="primary">新增</Button>
                        </Popconfirm>
                    </div>
                    <PublisherTable
                        pagination={this.state.pagination}
                        dataSource={this.state.dataSource}
                        onSave={(v) => { this.handleUpdate(v) }}
                        onDel={(key) => { this.handleDel(key) }}
                    />
                </Card>
            </div>
        )
    }
}

export default BookLib;