import React from 'react';
import moment from 'moment';
import { Input, DatePicker, Button, Modal, Table, message, Popover } from 'antd';

const { RangePicker } = DatePicker;

class Comment extends React.Component {

    state = {
        commnet: [],
        selectedRowKeys: [],  // Check here to configure the default column
        input1Value: '',
        input2Value: '',
        dateRange: ['', '']
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        const url = 'http://119.3.231.11:8080/yuyue/listUserdynamiccmnt';
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                // eslint-disable-next-line
                data.content.map((item) => {
                    item.key = item.commentId;
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
                    comment: data.content
                });
            })
            .catch(err => {
                console.log('fetch error', err)
            });
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys1 changed: ', selectedRowKeys);
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

    dynamicCommentSearch = () => {
        const state = this.state;
        const url = 'http://119.3.231.11:8080/yuyue/listUserdynamiccmnt';
        fetch(url +
            '?content=' + state.input1Value +
            '&userName=' + state.input2Value +
            '&starttime=' + state.dateRange[0] +
            '&endtime=' + state.dateRange[1]
        )
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line
                data.content.map((item, index) => {
                    item.key = index;
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
                    comment: data.content
                });
            })
            .catch(err => {
                console.log('fetch error', err)
            });
    }

    dynamicCommentDelete = () => {
        const state = this.state;
        const url = 'http://119.3.231.11:8080/yuyue/deleteUserdynamiccmnt';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
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
    }

    render() {

        const { comment, selectedRowKeys, input1Value, input2Value } = this.state;
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
            dataIndex: 'createTime'
        }];

        return (
            <React.Fragment>
                <Input
                    placeholder="内容模糊查询"
                    style={{ width: '200px' }}
                    value={input1Value}
                    onChange={this.input1Change}
                />
                <Input
                    placeholder="发布人"
                    style={{ width: '150px', marginLeft: '10px' }}
                    value={input2Value}
                    onChange={this.input2Change}
                />
                <RangePicker
                    style={{ marginLeft: '10px' }}
                    placeholder={['起始时间', '结束时间']}
                    onChange={this.rangePickerChange}
                />
                <Button
                    type="primary"
                    style={{ marginLeft: '10px' }}
                    onClick={this.dynamicCommentSearch}
                >
                    查询
			    </Button><br />
                <Button
                    type="primary"
                    style={{ marginTop: '10px' }}
                    onClick={this.dynamicCommentDelete}
                >
                    批量删除
				</Button>
                <Table
                    bordered
                    columns={columns}
                    dataSource={comment}
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

export default Comment;
