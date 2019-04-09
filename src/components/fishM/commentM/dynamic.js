import React from 'react';
import moment from 'moment';
import { Input, DatePicker, Button, Modal, Table, message, Popover } from 'antd';
import URL from '../../../api/config';
import { Link } from 'react-router-dom';

const { confirm } = Modal;
const { RangePicker } = DatePicker;

class Dynamic extends React.Component {

    state = {
        dynamic: [],
        selectedRowKeys: [],
        input1Value: '',
        input2Value: '',
        input3Value: '',
        dateRange: ['', '']
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${URL}/bUserdynamics`,
        {
            method:'GET',
            mode: 'cors',
            credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
        }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // eslint-disable-next-line
                data.content.map((item) => {
                    item.key = item.dynamicId;
                    item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
                    item.allContent = item.content;
                    item.content =
                        item.content.length > 50
                            ?
                            item.content.slice(0, 50) + '······'
                            :
                            item.content;
                });
                this.setState({
                    dynamic: data.content
                });
            })
            .catch(err => {
                console.log('fetch error', err)
            });
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys: selectedRowKeys });
    }

    dynamicSearch = () => {
        const state = this.state;
        fetch(`${URL}/bUserdynamics` +
            '?bookName=' + state.input1Value +
            '&content=' + state.input2Value +
            '&userName=' + state.input3Value +
            '&starttime=' + state.dateRange[0] +
            '&endtime=' + state.dateRange[1],
            {
                method:'GET',
                mode: 'cors',
                credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line
                data.content.map((item) => {
                    item.key = item.dynamicId;
                    item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
                    item.allContent = item.content;
                    item.content =
                        item.content.length > 50
                            ?
                            item.content.slice(0, 50) + '······'
                            :
                            item.content;
                });
                this.setState({
                    dynamic: data.content
                });
            })
            .catch(err => {
                console.log('fetch error', err)
            });
    }

    input1Change = (e) => {
        this.setState({
            input1Value: e.target.value
        });
    }

    input2Change = (e) => {
        this.setState({
            input2Value: e.target.value
        });
    }

    input3Change = (e) => {
        this.setState({
            input3Value: e.target.value
        });
    }

    rangePickerChange = (value, dateString) => {
        this.setState({
            dateRange: dateString
        });
    }

    dynamicDelete = () => {
        const state = this.state;
        confirm({
            title: `确定删除第${state.selectedRowKeys}条动态？`,
            content: `点击确定删除第${state.selectedRowKeys}条动态`,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                fetch(`${URL}/deleteUserdynamic`, {
                    method: 'POST',
                    credentials:"include",
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dynamicIds: state.selectedRowKeys
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.code) {
                            message.success('删除成功');
                            this.requestList();
                            this.setState({
                                selectedRowKeys: [],
                            })
                        } else {
                            message.error(`${data.message}`);
                        }
                    })
                    .catch(err => {
                        console.log('fetch error', err)
                    });
            },
            onCancel: () => {
                console.log('Cancel');
            }
        });
    }

    render() {

        const { dynamic, selectedRowKeys, input1Value, input2Value, input3Value } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys.sort(),
            onChange: this.onSelectChange,
            // onSelection: this.onSelection,
        };
        const columns = [{
            title: '序号',
            dataIndex: 'dynamicId'
        }, {
            title: '书名',
            dataIndex: 'bookName'
        }, {
            title: '动态内容',
            dataIndex: 'content',
            render: (text, record) => (
                <Popover
                    content={record.allContent}
                    title="详情"
                    trigger="hover"
                    mouseEnterDelay={.3}
                >
                    {text}
                </Popover>
            ),
        }, {
            title: '发布人',
            dataIndex: 'userName'
        }, {
            title: '发布时间',
            dataIndex: 'createTime'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`./commentM/dynamicCmnt/${record.dynamicId}`}>编辑评论</Link>
                </span>
            )
        }];

        return (
            <React.Fragment>
                <Input
                    placeholder="书名模糊查询"
                    style={{ width: '200px', marginTop: '10px' }}
                    value={input1Value}
                    onChange={this.input1Change}
                    onBlur={this.dynamicSearch}
                    onPressEnter={this.dynamicSearch}
                />
                <Input
                    placeholder="内容模糊查询"
                    style={{ width: '200px', marginLeft: '10px', marginTop: '10px' }}
                    value={input2Value}
                    onChange={this.input2Change}
                    onBlur={this.dynamicSearch}
                    onPressEnter={this.dynamicSearch}
                />
                <Input
                    placeholder="发布人"
                    style={{ width: '150px', marginLeft: '10px', marginTop: '10px' }}
                    value={input3Value}
                    onChange={this.input3Change}
                    onBlur={this.dynamicSearch}
                    onPressEnter={this.dynamicSearch}
                />
                <RangePicker
                    style={{ marginLeft: '10px', marginTop: '10px' }}
                    placeholder={['起始时间', '结束时间']}
                    onChange={this.rangePickerChange}
                />
                <Button
                    type="primary"
                    style={{ marginLeft: '10px', marginTop: '10px' }}
                    onClick={this.dynamicSearch}
                >
                    查询
				</Button><br />
                <Button
                    type="danger"
                    disabled={!selectedRowKeys.length}
                    style={{ marginTop: '10px' }}
                    onClick={this.dynamicDelete}
                >
                    批量删除
				</Button>
                <Table
                    bordered
                    columns={columns}
                    dataSource={dynamic}
                    rowSelection={rowSelection}
                    style={{ marginTop: '10px' }}
                    pagination={{
                        showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50']
                    }}
                />
            </React.Fragment>
        );
    }

}

export default Dynamic;
