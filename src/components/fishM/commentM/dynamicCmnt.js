import React from 'react';
import moment from 'moment';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Card, Input, DatePicker, Button, Modal, Table, message, Popover } from 'antd';
import URL from '../../../api/config';

const { confirm } = Modal;
const { RangePicker } = DatePicker;

class DynamicCmnt extends React.Component {

    state = {
        dynamicCmnt: [],
        selectedRowKeys: [],
        input1Value: '',
        input2Value: '',
        dateRange: ['', '']
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${URL}/userdynamiccmnts/${this.props.match.params.id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // eslint-disable-next-line
                data.content.map((item) => {
                    item.key = item.commentId;
                    item.createtime = moment(item.createtime).format("YYYY-MM-DD HH:mm:ss");
                    item.allContent = item.content;
                    item.content =
                        item.content.length > 50
                            ?
                            item.content.slice(0, 50) + '······'
                            :
                            item.content;
                });
                this.setState({
                    dynamicCmnt: data.content
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

    rangePickerChange = (value, dateString) => {
        this.setState({
            dateRange: dateString
        });
    }

    dynamicCmntSearch = () => {
        const state = this.state;
        fetch(`${URL}/userdynamiccmnts/${this.props.match.params.id}` +
            `?dynamicId=${this.props.match.params.id}` +
            '&content=' + state.input1Value +
            '&userName=' + state.input2Value +
            '&starttime=' + state.dateRange[0] +
            '&endtime=' + state.dateRange[1],
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            }
        )
            .then((res) => res.json())
            .then((data) => {
                data.content.map((item) => {
                    item.key = item.commentId;
                    item.createtime = moment(item.createtime).format("YYYY-MM-DD HH:mm:ss");
                    item.allContent = item.content;
                    item.content =
                        item.content.length > 50
                            ?
                            item.content.slice(0, 50) + '······'
                            :
                            item.content;
                });
                this.setState({
                    dynamicCmnt: data.content
                });
            })
            .catch((err) => {
                console.log('fetch error:', err)
            });
    }

    dynamicCmntDelete = () => {
        const state = this.state;
        confirm({
            title: `确定删除第${state.selectedRowKeys}条评论？`,
            content: `点击确定删除第${state.selectedRowKeys}条评论`,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                fetch(`${URL}/userdynamiccmnts`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json', 'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        commentIds: state.selectedRowKeys
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
                    .catch((err) => {
                        console.log('fetch error', err)
                    })
            },
            onCancel: () => {
                console.log('Cancel');
            }
        })
    }

    render() {

        const { dynamicCmnt, selectedRowKeys, input1Value, input2Value } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys.sort(),
            onChange: this.onSelectChange,
            // onSelection: this.onSelection,
        };
        const columns = [{
            title: '序号',
            dataIndex: 'commentId'
        }, {
            title: '评论人',
            dataIndex: 'userName'
        }, {
            title: '评论内容',
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
            title: '发布时间',
            dataIndex: 'createtime'
        }];

        return (
            <React.Fragment>
                <BreadcrumbCustom first="鱼群管理" second="动态评论管理" />
                <Card title={`动态评论管理：${this.props.match.params.id}`} >
                    <Input
                        placeholder="内容模糊查询"
                        style={{ width: '200px', marginTop: '10px' }}
                        value={input1Value}
                        onChange={this.input1Change}
                        onBlur={this.dynamicCmntSearch}
                        onPressEnter={this.dynamicCmntSearch}
                    />
                    <Input
                        placeholder="发布人"
                        style={{ width: '150px', marginLeft: '10px', marginTop: '10px' }}
                        value={input2Value}
                        onChange={this.input2Change}
                        onBlur={this.dynamicCmntSearch}
                        onPressEnter={this.dynamicCmntSearch}
                    />
                    <RangePicker
                        style={{ marginLeft: '10px', marginTop: '10px' }}
                        placeholder={['起始时间', '结束时间']}
                        onChange={this.rangePickerChange}
                    />
                    <Button
                        type="primary"
                        style={{ marginLeft: '10px', marginTop: '10px' }}
                        onClick={this.dynamicCmntSearch}
                    >
                        查询
			        </Button><br />
                    <Button
                        type="danger"
                        disabled={selectedRowKeys.length === 0}
                        style={{ marginTop: '10px' }}
                        onClick={this.dynamicCmntDelete}
                    >
                        批量删除
				    </Button>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dynamicCmnt}
                        rowSelection={rowSelection}
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

export default DynamicCmnt;
