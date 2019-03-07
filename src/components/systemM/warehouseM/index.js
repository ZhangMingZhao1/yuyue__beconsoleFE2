import React from 'react';
import { Select, Input, Button, Card, Table, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const Option = Select.Option;
const confirm = Modal.confirm;

class WarehouseM extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departmentData: [],
            searchInputValue: '',
            selectedRowKeys: [], // Check here to configure the default column
            warehouseData: []
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.searchInputChange = this.searchInputChange.bind(this);
        this.searchBtnClick = this.searchBtnClick.bind(this);
        this.deleteBtnClick = this.deleteBtnClick.bind(this);
    }

    componentDidMount() {
        this.requestList();
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

    requestList = () => {
        const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/staffM/organizationM';
        fetch(url,{
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
                console.log(this.state.warehouseData)
            })
            .catch(err => {
                console.log('fetch error', err)
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
                                    新建
                                </Button>
                                {
                                    editing ?
                                        <Button
                                            type="primary"
                                            onClick={this.saveBtnClick}
                                        >
                                            保存
                                        </Button>
                                        :
                                        <Button
                                            type="primary"
                                            disabled={!hasSelected}
                                        >
                                            修改
                                        </Button>
                                }
                                <Button
                                    type="primary"
                                    disabled={!hasSelected}
                                    onClick={this.deleteBtnClick}
                                >
                                    删除
                                </Button>
                            </div>
                            <Table
                                bordered
                                rowSelection={rowSelection}
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
            </React.Fragment>
        );
    }
}

export default WarehouseM;
