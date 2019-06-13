import React from 'react';
import { Form, Button, Table, Popconfirm, Input, Select } from 'antd';
import { getOptionList } from '../../baseFormItem';
import Req from '../request';
import "./index.less";
import moment from "moment";

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
        }
    };

    render() {
        const { editing, dataIndex, inputItem, record, index, ...restProps } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    this.form = form;
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? <FormItem style={{ margin: 0 }}>
                                {getFieldDecorator(dataIndex, {
                                    initialValue: record[dataIndex],
                                    rules: inputItem.rules || [],
                                })(this.getInput(inputItem, dataIndex))}
                            </FormItem> :
                                // 货位特殊处理：显示名称而非id值
                                // 不存在id值对应的下拉框选项则显示""(空字符串)
                                (dataIndex === 'locationId' && (inputItem.list[record[dataIndex]] || "")) || restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class InStoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.setColumns(props.type);
        this.state = {
            editingKey: '',
            data: this.props.dataSource,
            warehouseId: this.props.warehouseId,
            count: 0,
            inputItem: {
                'code': { type: 'INPUT', rules: [{ required: true, validator: this.changeCode }] },
                'isbn': { type: 'INPUT', rules: [{ required: true, message: 'null' }] },
                // 'rfid': { type: 'INPUT', rules: [{ required: true, validator: this.validateRfid }] },
                'rfid': { type: 'INPUT', rules: [{ required: true, message: 'null' }] },
                'price': { type: 'INPUT' },
                'locationId': { type: 'SELECT', list: [] },
            },
        };
        this.type = this.props.type;//只是用于记录type是否发生改变
        this.form = {};//每行数据对应的form
        this.deleteData = [];//被删除的数据，不包括新增后删除的数据
        this.bookId = [];//每行对应的bookId
    }

    //检测rfid,需满足数据库中不存在rfid
    validateRfid(rule, value, callback) {
        if (value) {
            Req.getRfidStatus(value).then(result => {
                result &&//返回值为-1,相应的rfid不存在数据库
                    result === -1 ? callback() : callback("书籍已存在")
            })
        } else {//输入值为空，提示null
            callback("null");
        }
    }

    //条码输入框发生改变时
    changeCode = (rule, value, callback) => {
        if (value) {
            const { editingKey } = this.state;
            //通过条码自动填充信息
            Req.getInfoByCode(value).then(v => {
                if (v !== -1) {//不存在对应的信息，服务器返回-1
                    this.form[editingKey].setFieldsValue({ isbn: v.isbn, rfid: v.rfid, price: v.price });
                    this.bookId[editingKey] = v.bookId;
                }
                callback();
            });
        } else {//输入值为空，提示null
            callback("null");
        }
    }

    //配置Table columns
    setColumns = (type) => {
        this.columns = [
            { title: '序号', dataIndex: 'index', width: '16.5%', render: (text, record, index) => index },//key!=index
            { title: '条码', dataIndex: 'code', width: '16.5%', editable: true },
            { title: 'ISBN', dataIndex: 'isbn', width: '16.5%', editable: true },
            { title: '电子标签', dataIndex: 'rfid', width: '16.5%', editable: true },
            { title: '成本价', dataIndex: 'price', width: '16.5%', editable: true },
            { title: '货位', dataIndex: 'locationId', width: '16.5%', editable: true },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <EditableContext.Consumer>
                            {(form) => {
                                this.form[record.key] = form;//获取每行form  
                                return <Popconfirm title="Sure to delete?" onConfirm={() => { this.handleDelete(record.key) }}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>
                            }}
                        </EditableContext.Consumer>
                    );
                },
            },
        ];
        if (type !== 'add') {
            //删除'操作'栏
            this.columns = this.columns.filter(i => i.dataIndex !== "operation")
            //置为不可编辑
            this.columns.forEach(i => { i.editable = false });
        }
    }

    componentWillReceiveProps(v) {
        let data = this.state.data;
        //订单状态发生变化时，重新配置table columns
        if (v.type != this.type) {
            this.type = v.type;
            this.setColumns(v.type);
        }
        //仓库改变时
        if (v.warehouseId !== this.state.warehouseId) {
            //所有书籍选项的货位清空
            data.map(i => { i.locationId = "" })
            this.form[this.state.editingKey] && this.form[this.state.editingKey].setFieldsValue({ "locationId": "" })
            //改变下拉框选项
            Req.getLocations(v.warehouseId).then((list) => {
                this.setState({
                    inputItem: {
                        ...this.state.inputItem,
                        'locationId': { type: 'SELECT', list: list }
                    },
                })
            })
        }
        this.setState({
            //书籍信息列表
            //自身data长度不为0,则不接受父级传递的更新
            data: this.state.data.length === 0 ? v.dataSource : data,
            count: this.state.data.length === 0 ? v.dataSource.length : this.state.count,
        })
    }

    //重置表格
    resetTable = (callback) => {
        this.setState({ data: [] }, () => { if (callback) { callback() } })
    }

    isEditing = record => record.key == this.state.editingKey;

    //获得表格的值
    getTableValues = (call) => {
        const { editingKey } = this.state;
        this.save(editingKey, (v) => {
            if (v !== 'error') {
                let list = this.state.inputItem.locationId.list;
                let data = v.concat(this.deleteData).map(i => {
                    if (!list[i.locationId]) {
                        i.locationId = null;
                    }
                    return i;
                })
                call(data)
            }
        });
    }

    //编辑行
    edit = (key) => {
        const { editingKey } = this.state;
        if (editingKey !== key) {//当前编辑行 ！== 将要编辑行
            this.save(editingKey, (v) => { if (v != 'error') { this.setState({ editingKey: key }) } });//存储当前编辑行，才能编辑其他行
        } else {
            this.setState({ editingKey: key });
        }
    }

    save = (key, callback) => {
        if (this.form[key]) {
            this.form[key].validateFields((error, row) => {
                if (error) {
                    return callback('error');
                }
                const newData = [...this.state.data];
                const index = newData.findIndex(item => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                        bookId: this.bookId[key],
                    });
                    this.setState({ data: newData, editingKey: '' }, () => { callback(this.state.data) });
                } else {
                    newData.push(row);
                    this.setState({ data: newData, editingKey: '' }, () => { callback(this.state.data) });
                }
            });
        } else {
            callback(this.state.data);
        }
    }

    add = () => {
        const { count, data } = this.state;
        const newData = { key: count };//key == count
        this.setState({
            data: [...data, newData],
            editingKey: count,
            count: count + 1,
        })
    }

    //"新增"按钮
    handleAdd = () => {
        const { editingKey } = this.state;
        if (this.form[editingKey]) {
            this.save(editingKey, (v) => { if (v != 'error') { this.add() } });//save处于编辑状态中的form 然后添加新行
        } else {
            this.add()
        }
    }

    //"删除"按钮
    handleDelete = (key) => {
        const data = [...this.state.data];
        let deleteItem = data.find(i => i.key === key);
        //删除的项存在服务器连接的数据库中，则将这一项记录在this.deleteData中，并且isDelete标记为1
        if (deleteItem.bookId) {
            this.deleteData.push({ ...deleteItem, isDelete: 1 })
        }
        //更新data数据,并删除对应的form
        this.setState({ data: data.filter(item => item.key !== key), editingKey: '' }, () => { delete this.form[key]; });
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {//不可编辑，直接按照dataSource显示
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputItem: this.state.inputItem[col.dataIndex],
                    dataIndex: col.dataIndex,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div style={{ position: 'relative' }}>
                <div style={{ display: `${this.props.type == 'add' ? 'inline' : 'none'}` }}>
                    <Button type="primary" onClick={() => this.handleAdd()}>新增一条记录</Button>
                    <Button type="primary" >批量导入</Button>
                </div><br />
                <Table
                    className='outStoreData-table'
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                if (this.props.type === 'add') {//“草稿”状态的库单，才可编辑
                                    this.edit(record.key);
                                }
                            }
                        };
                    }}
                    pagination={{
                        showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50']
                    }}
                />
                {
                    this.props.type == 'add' ?
                        <p style={{ position: 'absolute', bottom: 0, marginBottom: 28 }}>合计：{this.state.data.length} 本书</p> :
                        <p style={{ textAlign: 'justify' }}>
                            <font style={{ float: 'left' }}>合计：{this.state.data.length} 本书</font>
                            {this.props.type == 'detail' ? <font style={{ float: 'right' }}>审核时间：{this.props.reviewTime && moment(this.props.reviewTime).format("YYYY-MM-DD HH:mm:ss")}</font> : ''}
                            <font style={{ float: 'right', marginRight: 20 }}>审核人：{this.props.user1Name}</font>
                        </p>
                }

            </div>
        )
    }
}

export default InStoreTable;