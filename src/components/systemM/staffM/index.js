import React from 'react';
import { Card, Button, Input, Select, Popconfirm, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class StaffM extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '员工姓名',
            dataIndex: 'staffName',
            render: (text, record, index) => this.renderColumns(this.state.staffData, index, 'staffName', text),
        }, {
            title: '手机号码',
            dataIndex: 'phoneNumber',
            render: (text, record, index) => this.renderColumns(this.state.staffData, index, 'phoneNumber', text),
        }, {
            title: '所属机构',
            dataIndex: 'whichOrg',
            render: (text, record, index) => this.renderColumns(this.state.staffData, index, 'whichOrg', text),
        }, {
            title: '所属部门',
            dataIndex: 'whichDepartment',
            render: (text, record, index) => this.renderColumns(this.state.staffData, index, 'whichDepartment', text),
        }, {
            title: '角色',
            dataIndex: 'role',
            render: (text, record, index) => this.renderColumns(this.state.staffData, index, 'role', text),
        }, {
            title: '状态',
            dataIndex: 'state',
            render: (text, record, index) => this.renderColumns(this.state.staffData, index, 'state', text),
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.staffData[index].name;
                return (
                    <div>
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.editDone(index, 'save')}>保存</a>
                                    <Popconfirm
                                        okText="确定"
                                        cancelText="取消"
                                        title="确定放弃修改？"
                                        onConfirm={() => this.editDone(index, 'cancel')}
                                    >
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                                :
                                <span>
                                    <a onClick={() => this.edit(index)}>修改</a>
                                </span>
                        }
                        {
                            this.state.staffData.length > 0 ?
                                (
                                    <span>
                                        <Popconfirm
                                            okText="确定"
                                            cancelText="取消"
                                            title="确定删除？"
                                            onConfirm={() => this.onDelete(index)}
                                        >
                                            <a href="javascript:;">删除</a>
                                        </Popconfirm>
                                    </span>
                                ) : null
                        }
                    </div>
                );
            }
        }];
        this.state = {
            staffData: [{
                staffName: {
                    editable: false,
                    value: '毛大虎'
                },
                phoneNumber: {
                    editable: false,
                    value: '13102020202'
                },
                whichOrg: {
                    editable: false,
                    value: '朝阳街道'
                },
                whichDepartment: {
                    editable: false,
                    value: '技术部'
                },
                role: {
                    editable: false,
                    value: '系统管理员'
                },
                state: {
                    editable: false,
                    value: '正常'
                },
            }]
        }
        this.findBtnClick = this.findBtnClick.bind(this);
    }

    findBtnClick() {
        console.log('findBtnClicked');
    }

    editDone(index, type) {
        const { staffData } = this.state;
        Object.keys(staffData[index]).forEach((item) => {
            if (staffData[index][item] && typeof staffData[index][item].editable !== 'undefined') {
                staffData[index][item].editable = false;
                staffData[index][item].status = type;
            }
        });
        this.setState({ staffData }, () => {
            Object.keys(staffData[index]).forEach((item) => {
                if (staffData[index][item] && typeof staffData[index][item].editable !== 'undefined') {
                    delete staffData[index][item].status;
                }
            });
        });
    }

    onDelete(index) {
        const data = [...this.state.staffData];
        data.splice(index, 1);
        this.setState({ staffData: data });
    }

    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (
            <EditableCell
                editable={editable}
                value={text}
                onChange={value => this.handleChange(key, index, value)}
                status={status}
            />);
    }

    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ staffData: data });
    }

    render() {
        const { staffData } = this.state;
        const dataSource = staffData.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="员工管理" />
                <Card title="员工管理">
                    <div>
                        <Input
                            placeholder="姓名"
                            style={{ width: '100px' }}
                        />
                        <Select
                            style={{ width: '150px', marginLeft: '10px' }}
                            defaultValue="朝阳街道"
                        >
                            <Select.Option value="朝阳街道">朝阳街道</Select.Option>
                        </Select>
                        <Select
                            style={{ width: '150px', marginLeft: '10px' }}
                            defaultValue="技术部"
                        >
                            <Select.Option value="技术部">技术部</Select.Option>
                        </Select>
                        <Select
                            style={{ width: '150px', marginLeft: '10px' }}
                            defaultValue="正常"
                        >
                            <Select.Option value="正常">正常</Select.Option>
                            <Select.Option value="停用">停用</Select.Option>
                        </Select>
                        <Button
                            type="primary"
                            style={{ marginLeft: '10px' }}
                            onClick={this.findBtnClick}
                        >
                            查询
                        </Button>
                    </div>
                    <Table
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        style={{ marginTop: '10px' }}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                    />
                </Card>
            </React.Fragment>
        );
    }
}

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: this.props.editable || false,
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({ value });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div>
                {
                    editable ?
                        <div>
                            <Input
                                value={value}
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        :
                        <div className="editable-row-text">
                            {value.toString() || ' '}
                        </div>
                }
            </div>
        );
    }
}

export default StaffM;
