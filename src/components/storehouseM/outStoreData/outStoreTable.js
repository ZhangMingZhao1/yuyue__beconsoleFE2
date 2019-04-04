import React from 'react';
import { Form, Button, Table, Popconfirm, Input, Select } from 'antd';
import { getOptionList } from '../../baseFormItem';
import "./index.less"

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

class OutStoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editingKey: '',type: this.props.type, data: this.props.dataSource, count: 0 };
        this.form = {};//每行数据对应的form
        this.columns = [
            { title: '序号', dataIndex: 'index', width: '16.5%', render: (text, record, index) => index },//key!=index
            { title: '条码', dataIndex: 'barCode', width: '16.5%', editable: true },
            { title: 'ISBN', dataIndex: 'isbn', width: '16.5%', editable: true },
            { title: '电子标签', dataIndex: 'eLabel', width: '16.5%', editable: true },
            { title: '货位', dataIndex: 'location', width: '16.5%', editable: true },
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
        if(this.state.type!=='add'){
            //增加'成本价'栏
            this.columns.splice(4,0,{ title: '成本价', dataIndex: 'cost', width: '16.5%', editable: true });
            //删除'操作'栏
            this.columns.splice(-1,1);
            //置为不可编辑
            this.columns.forEach(i=>{i.editable=false});
        }
        this.inputItem = {
            'barCode': { type: 'INPUT', rules: [{ required: true, message: 'null' }] },
            'isbn': { type: 'INPUT', rules: [{ required: true, message: 'null' }] },
            'eLabel': { type: 'INPUT', rules: [{ required: true, message: 'null' }] },
            'location': { type: 'SELECT', list: [] },
        }
    }
    isEditing = record => record.key == this.state.editingKey;

    //获得表格的值
    getTableValues = (call) => {
        const { editingKey } = this.state;
        this.save(editingKey, (v) => { call(v) });
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
                    });
                    this.setState({ data: newData, editingKey: '' }, () => { callback(this.state.data) });
                } else {
                    newData.push(row);
                    this.setState({ data: newData, editingKey: '' }, () => { callback(this.state.data) });
                }
            });
        }else{
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
            <div style={{ position: 'relative' }}>
                <div style={{display:`${this.state.type=='add'? 'inline':'none'}`}}>
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
                                this.edit(record.key);
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
                    this.state.type=='add'?
                    <p style={{ position: 'absolute', bottom: 0, marginBottom: 28 }}>合计：{this.state.data.length} 本书</p>:
                    <p style={{textAlign: 'justify'}}>
                        <font style={{float:'left'}}>合计：{this.state.data.length} 本书</font>
                        {this.state.type=='detail'? <font style={{float:'right'}}>审核时间：2018-12-11  08:12:24</font>:''}
                        <font style={{float:'right',marginRight: 20}}>审核人：李四</font>
                    </p>
                }
                
            </div>
        )
    }
}

export default OutStoreTable;