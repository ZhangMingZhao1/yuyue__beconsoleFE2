import React from 'react';
import { Card, Table, Divider, Tree, Input, Button, Icon, Modal, Row, Col, Radio,Popconfirm } from 'antd';
import './ThemeControl.less';

const { TreeNode } = Tree;
const Search = Input.Search;
const DirectoryTree = Tree.DirectoryTree;
const RadioGroup = Radio.Group;

const treeData = [
    {
        title: '书籍目录',
        key: '0',
        children: [{
            title: '儿童',
            key: '0-0',
            children: [
                { title: '3-6岁', key: '0-0-0' },
            ],
        },
        {
            title: 'item 1.2',
            key: '0-1',
        },
        {
            title: 'item 1.3',
            key: '0-2',
        }]
    }
];

const radioData = [
    {
        value: '3123123213',
        text: '小兔子乖乖',
    },
    {
        value: '312312342213',
        text: '三字经',
    },
    {
        value: '312312342413',
        text: '弟子规',
    },
    {
        value: '3123123342413',
        text: '希腊神话',
    }
];

class ThemeContent extends React.Component {
    state = {
        visible: false,
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    onExpand = (expandedKeys) => {
        console.log(expandedKeys)
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState({
            searchValue: value,
        });
    }

    onSelect = (e) => {
        console.log(e);
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} isLeaf />;
    })

    renderRadios = (data) => {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const radios = data.map((item) => {
            return <Radio style={radioStyle} key={item.value} value={item.value}>{item.text}</Radio>;
        })
        return radios;
    }

    render() {
        const columns = [
            { title: '序号', dataIndex: 'index', render: (text, record, index) => index + 1 },
            { title: '书名', dataIndex: 'book' },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => { }}>
                    <a href="javascript:;"><Icon type="close" /></a>
                    </Popconfirm>
                ),
            }];

        const data = [{
            key: '1',
            book: '钢铁是怎么炼成的',
        }, {
            key: '2',
            book: '我的好妈妈',
        }];

        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        return (

            <div className="">
                <div>专题管理</div>
                <Card
                    title="专题内容管理"
                >
                    <Table
                        title={() => ("专题名称：鱼阅专题")}
                        showHeader={false}
                        pagination={false}
                        className="themecontrol-table"
                        columns={columns}
                        dataSource={data}
                    /><br />
                    <Button type="primary" style={{ width: 60 }} icon="plus" onClick={this.showModal} />
                </Card>

                <Modal
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={700}
                >
                    <Row>
                        <Col span={11}>
                            <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                            <div style={{ overflow: 'auto', height: 400 }}>
                                <DirectoryTree
                                    multiple
                                    defaultExpandAll
                                    onSelect={this.onSelect}
                                    onExpand={this.onExpand}
                                >
                                    {this.renderTreeNodes(treeData)}
                                </DirectoryTree>
                            </div>
                        </Col>
                        <Col span={2}><Divider type="vertical" /></Col>
                        <Col span={11}>
                            <div style={{ overflow: 'auto', height: 500 }}>
                                <RadioGroup onChange={this.onChange}>
                                    {this.renderRadios(radioData)}
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export default ThemeContent;