import React from 'react';
import { Select, Input, Button, Row, Col, Card, Table, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const Option = Select.Option;
const confirm = Modal.confirm;

class WarehouseM extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 3,
            editing: false,
            editable: true,
            departmentData: [],
            searchInputValue: '',
            selectedRowKeys: [], // Check here to configure the default column
            warehouseData: [{
                // key: 1,
                number: 1,
                warehouseNumber: 1,
                warehouseName: '北京分公司XX区XX仓库',
                department: 'XXX',
                people: '胡晓雪',
                phoneNumber: 18888888888,
                address: '北京市XX区XX街道XX号',
                remark: 'XXXXXX',
                operator: '妈妈送旺仔牛奶的那个李子明',
                changeDate: '2018-02-26'
            },
            {
                // key: 2,
                number: 2,
                warehouseNumber: 2,
                warehouseName: '北京分公司XX区XX仓库',
                department: 'XXX',
                people: '胡晓雪',
                phoneNumber: 18888888888,
                address: '北京市XX区XX街道XX号',
                remark: 'XXXXXX',
                operator: '妈妈送旺仔牛奶的那个李子明',
                changeDate: '2018-03-08'
            }
            ]
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.searchInputChange = this.searchInputChange.bind(this);
        this.searchBtnClick = this.searchBtnClick.bind(this);
        this.addBtnClick = this.addBtnClick.bind(this);
        this.editBtnClick = this.editBtnClick.bind(this);
        this.saveBtnClick = this.saveBtnClick.bind(this);
        this.deleteBtnClick = this.deleteBtnClick.bind(this);
    }

    handleSelectChange() {

    }

    searchInputChange(e) {
        const value = e.target.value;
        this.setState(() => ({
            searchInputValue: value
        }));
    }

    searchBtnClick() {
        console.log('searchBtnClicked');
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    addBtnClick() {
        const { count, warehouseData } = this.state;
        const newData = {
            number: count,
            warehouseNumber: count,
            warehouseName: '北京分公司XX区XX仓库',
            department: 'XXX',
            people: '胡晓雪',
            phoneNumber: 18888888888,
            address: '北京市XX区XX街道XX号',
            remark: 'XXXXXX',
            operator: '妈妈送旺仔牛奶的那个李子明',
            changeDate: '2018-02-26'
        }
        this.setState(() => ({
            warehouseData: [...warehouseData, newData],
            count: count + 1
        }));
    }

    editBtnClick() {
        this.setState(() => ({
            editing: true
        }));
    }

    saveBtnClick() {
        confirm({
            okText: '确定',
            cancelText: '放弃',
            content: '是否确定保存修改？',
            onOk: () => { },
            onCancel: () => { },
        });
        this.setState(() => ({
            editing: false
        }));
    }

    deleteBtnClick() {
        confirm({
            okText: '删除',
            cancelText: '取消',
            content: `是否确定删除这 ${this.state.selectedRowKeys.length} 条仓库信息`,
            onOk: () => {
                let tmp = this.state.selectedRowKeys.sort();
                let len = tmp.length;
                let cnt = 0;
                let data = this.state.warehouseData;
                for (let i = 0; i < len; i++) {
                    tmp[i] -= cnt;
                    data.splice(tmp[i], 1);
                    cnt++;
                }
                this.setState({ selectedRowKeys: [], warehouseData: data })
                console.log(data);
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }

    render() {

        const { selectedRowKeys, editing } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            // onSelection: this.onSelection,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [{
            title: '序号',
            dataIndex: 'number',
        }, {
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
        }
        ];

        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="仓库维护" />
                <div>
                    所属部门：
                    <Select
                        style={{ width: 120, marginLeft: '10px' }}
                        onChange={this.handleSelectChange}
                    >
                        <Option value="1">1</Option>
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
                    <Row gutter={16}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div>
                                        <Button
                                            type="primary"
                                            style={{ marginTop: '10px' }}
                                            onClick={this.addBtnClick}
                                        >
                                            新建
                                        </Button>
                                        {
                                            editing ?
                                                <Button
                                                    type="primary"
                                                    style={{ marginTop: '10px' }}
                                                    onClick={this.saveBtnClick}
                                                >
                                                    保存
                                                </Button>
                                                :
                                                <Button
                                                    type="primary"
                                                    style={{ marginTop: '10px' }}
                                                    disabled={!hasSelected}
                                                    onClick={this.editBtnClick}
                                                >
                                                    修改
                                                </Button>
                                        }
                                        <Button
                                            type="primary"
                                            style={{ marginTop: '10px' }}
                                            disabled={!hasSelected}
                                            onClick={this.deleteBtnClick}
                                        >
                                            删除
                                        </Button>
                                    </div>
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={this.state.warehouseData}
                                        style={{ marginTop: '24px' }}
                                    />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default WarehouseM;
