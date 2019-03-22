import React from 'react';
import { Select, Input, Button, Card, Table, Divider, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';

const Option = Select.Option;
const confirm = Modal.confirm;

class WarehouseM extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: '',
            warehouseData: []
        }
    }

    componentDidMount() {
        this.requestList();
    }

    handleSelectChange = () => {

    }

    searchInputChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({
            searchInputValue: value
        }));
    }

    searchBtnClick = () => {
        console.log('searchBtnClicked');
    }

    requestList = () => {
        const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/staffM/organizationM';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: this.state.data
            })
        })
            .then((res) => res.json())
            .then(data => {
                // eslint-disable-next-line
                data.data.warehouseData.map((item, index) => {
                    item.key = index;
                });
                this.setState({
                    warehouseData: data.data.warehouseData
                });
                console.log(this.state.warehouseData);
            })
            .catch(err => {
                console.log('fetch error', err);
            });
    }

    deleteBtnClick = (key) => {
        confirm({
            title: 'Want to delete these items?',
            content: 'some descriptions',
            onOk: () => {
                console.log('OK');
                console.log(key);
                const data = this.state.warehouseData;
                data.splice(key, 1);
                this.setState({
                    warehouseData: data
                });
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }

    render() {

        const columns = [{
            title: '仓库编号',
            dataIndex: 'warehouseNumber',
        }, {
            title: '仓库名称',
            dataIndex: 'warehouseName',
        }, {
            title: '所属部门',
            dataIndex: 'department',
        }, {
            title: '联系人',
            dataIndex: 'people'
        }, {
            title: '联系方式',
            dataIndex: 'phoneNumber'
        }, {
            title: '地址',
            dataIndex: 'address'
        }, {
            title: '备注',
            dataIndex: 'remark'
        }, {
            title: '操作员',
            dataIndex: 'operator'
        }, {
            title: '修改日期',
            dataIndex: 'changeDate'
        }, {
            title: '操作',
            dataIndex: 'option',
            render: (text, record, key) => (
                <span>
                    <Link to={`${this.props.match.url}/changeWarehouse/${record.warehouseNumber}`}>修改</Link>
                    <Divider type="vertical" />
                    {/* eslint-disable-next-line */}
                    <a href="javascript:;" onClick={() => this.deleteBtnClick(key)}>删除</a>
                </span>
            )
        }];

        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="仓库维护" />
                <Card title="仓库维护">
                    <div>
                        所属部门：
                        <Select
                            style={{ width: 120, marginLeft: '10px' }}
                            onChange={this.handleSelectChange}
                        >
                            <Option placeholder="全部" value="1">1</Option>
                        </Select>
                        <Input
                            style={{ width: '400px', marginLeft: '10px' }}
                            placeholder="仓库名称，编号，联系人，地址模糊查询"
                            onChange={this.searchInputChange}
                            value={this.state.searchInputValue}
                        />
                        <Button
                            type="primary"
                            onClick={this.searchBtnClick}
                            style={{ marginLeft: '10px' }}
                        >
                            查询
                        </Button>
                    </div>
                    <div>
                        <div className="gutter-box">
                            <div style={{ marginTop: '24px' }}>
                                <Button
                                    type="primary"
                                >
                                    <Link to={`${this.props.match.url}/addWarehouse`}>
                                        新建
                                    </Link>
                                </Button>
                            </div>
                            <Table
                                bordered
                                columns={columns}
                                dataSource={this.state.warehouseData}
                                style={{ marginTop: '10px' }}
                                pagination={{
                                    showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50']
                                }}
                            />
                        </div>
                    </div>
                </Card>
            </React.Fragment >
        );
    }
}

export default WarehouseM;
