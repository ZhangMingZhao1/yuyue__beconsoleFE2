import React from 'react';
import { Card, Select, Input, Button, Table, Popconfirm, Divider } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const Option = Select.Option;

class CabinetM extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: 'name',
            dataIndex: 'name',

            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
        }, {
            title: 'age',
            dataIndex: 'age',

            render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text),
        }, {
            title: 'address',
            dataIndex: 'address',

            render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].name;
                return (
                    <div className="editable-row-operations">
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
                        <Divider type="vertical" />
                        {
                            this.state.data.length > 0 ?
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
            },
        }];
        this.state = {
            searchInputValue: '',
            data: [{
                key: '0',
                name: {
                    editable: false,
                    value: 'Edward King 0',
                },
                age: {
                    editable: false,
                    value: '32',
                },
                address: {
                    value: 'London, Park Lane no. 0',
                },
            }],
        };
        this.searchInputChange = this.searchInputChange.bind(this);
        this.addBtnClick = this.addBtnClick.bind(this);
    }

    searchInputChange(e) {
        const value = e.target.value;
        this.setState(() => ({
            searchInputValue: value
        }));
    }

    addBtnClick() {
        const { count, data } = this.state;
        const newData = {
            key: '0',
            name: {
                editable: false,
                value: 'Edward King 0',
            },
            age: {
                editable: false,
                value: '32',
            },
            address: {
                value: 'London, Park Lane no. 0',
            },
        };
        this.setState({
            data: [...data, newData],
            count: count + 1,
        });
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
        this.setState({ data });
    }

    edit(index) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({ data });
    }

    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }

    onDelete(index) {
        const data = [...this.state.data];
        data.splice(index, 1);
        this.setState({ data });
    }

    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="机柜管理" />
                <div>
                    <Card title="机柜管理">
                        <div>
                            所属仓库：
                            <Select
                                defaultValue="1"
                                style={{ width: '150px', marginLeft: '10px' }}
                                onChange={this.handleSelectChange}
                            >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                            </Select>
                            <Input
                                style={{ width: '400px', marginLeft: '10px' }}
                                placeholder="柜子名称，编号，运维人，地址模糊查询"
                                onChange={this.searchInputChange}
                                value={this.state.searchInputValue}
                            />
                            <Button
                                type="primary"
                                style={{ marginLeft: '10px' }}
                            >
                                查询
                            </Button>
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <Button
                                type="primary"
                                style={{ marginTop: '10px' }}
                                onClick={this.addBtnClick}
                            >
                                新增
                            </Button>
                            <Select
                                style={{ width: '150px', marginLeft: '20%' }}
                                onChange={this.handleSelectChange}
                                defaultValue="海淀区"
                            >
                                <Option value="海淀区">海淀区</Option>
                                <Option value="全部">全部</Option>
                            </Select>
                            <Select
                                style={{ width: '150px', marginLeft: '10px' }}
                                onChange={this.handleSelectChange}
                                defaultValue="朝阳街道"
                            >
                                <Option value="朝阳街道">朝阳街道</Option>
                                <Option value="全部">全部</Option>
                            </Select>
                            <Select
                                style={{ width: '150px', marginLeft: '10px' }}
                                onChange={this.handleSelectChange}
                                defaultValue="正常"
                            >
                                <Option value="正常">正常</Option>
                                <Option value="全部">全部</Option>
                            </Select>
                        </div>
                        <div>
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
                        </div>
                    </Card>
                </div>
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

export default CabinetM;
