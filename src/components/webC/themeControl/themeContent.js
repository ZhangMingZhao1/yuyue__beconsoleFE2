import React from 'react';
import { Card, Table, Divider, Tree, Input, Button, Icon, Modal, Row, Col, Radio, message, Popconfirm, Spin } from 'antd';
import './index.less';
import Url from '../../../api/config';
const { TreeNode } = Tree;
const Search = Input.Search;
const DirectoryTree = Tree.DirectoryTree;
const RadioGroup = Radio.Group;

class ThemeContent extends React.Component {
    state = {
        visible: false,
        searchValue: '',//书名模糊查询
        searchCategory: '',//目录查询
        treeData: [{//目录树行列表
            title: <span><Icon type="loading" />&emsp;书籍目录</span>,
            key: '0',
        }],
        loading: false,//查询加载
        Adding: false,//增加专题书籍loading
        radioData: [],//查询结果
    };

    componentDidMount() {
        this.requestList();
        this.requestCategory();
    }

    /**
     * 专题书籍查询
     */
    requestList() {
        fetch(`${Url}/getBooks?booksubjectId=${this.props.match.params.id}`)
            .then((res) => res.json()).then(data => {
                this.setState({
                    booksubjectId: data.subject.booksubjectId,
                    subjectName: data.subject.subjectName,
                    dataSource: data.list.map(i => ({
                        key: i.bookinsubjectId,
                        bookName: i.bsBookinfo.bookName,
                    })),
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    /**
     * 书籍目录获取
     */
    requestCategory() {
        fetch(`${Url}/listBookcategory`)
            .then((res) => res.json()).then(data => {
                this.setState({
                    treeData: [{
                        title: "书籍目录",
                        key: '0',
                        children: this.fomatData(data)
                    }]
                }, () => { console.log(this.state.treeData) })
            }).catch((err) => {
                console.log(err);
            })
    }

    /**
     * 书名&目录 查询
     */
    requestQuery() {
        fetch(`${Url}/getByCategoryAndBookName?bsBookcategory=${this.state.searchCategory}&bookName=${this.state.searchValue}`)
            .then((res) => res.json()).then(data => {
                this.setState({
                    radioData: data.map(i => ({
                        value: i.bookinfoId,
                        text: i.bookName,
                    })),
                    loading: false,
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    /**
     * 增加专题书籍
     * @param {*} value 书籍ID
     */
    requestAdd(value) {
        console.log(JSON.stringify({ bsBookinfo: value, bsBooksubject: this.state.booksubjectId }))
        fetch(`${Url}/addbookinsubject`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify({ bookinfoId: value, booksubjectId: this.state.booksubjectId })
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("新增成功 " + JSON.stringify(result.data))
                this.setState({ visible: false, Adding: false});
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    //格式化目录数据
    fomatData(data) {
        return data.map(i => ({
            title: i.categoryName,
            key: i.categoryId,
            children: i.bsBookcategorys.length > 0 ? this.fomatData(i.bsBookcategorys) : null
        }))
    }

    /**
     * 删除专题书籍
     * @param {*} key Bookidinsubjeck
     */
    handleDel(key) {
        fetch(`${Url}/deletebookinsubject?bookinsubjectId=${key}`)
            .then((res) => res.json()).then(result => {
                if (result.code === 0) {
                    console.log(result.data)
                    message.success("删除" + JSON.stringify(result.data) + "成功")
                    this.requestList();//刷新页面
                } else {
                    message.error(result.message)
                }
            }).catch((err) => {
                console.log(err)
            })
    }

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

    onSearch = (v) => {
        this.setState({
            searchValue: v,
            loading: true,
        }, () => { this.requestQuery() });
    }

    onSelect = (selectedKeys, e) => {
        let node = e.selectedNodes[0];
        console.log(node);
        if (node && node.props.isLeaf) {
            this.setState({
                searchCategory: node.key,
                loading: true,
            }, () => { this.requestQuery() })
        }
    }

    renderTreeNodes = (data) => (
        data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} isLeaf />;
        })
    )

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

    onChange = (e) => {
        this.setState({
            Adding: true
        },()=>{this.requestAdd(e.target.value)})
        
    }

    render() {
        const columns = [
            { title: '序号', dataIndex: 'index', render: (text, record, index) => index + 1 },
            { title: '书名', dataIndex: 'bookName' },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm title="是否确定删除?" okText="删除" cancelText="取消" onConfirm={() => { this.handleDel(record.key) }}>
                        <a href="javascript:;"><Icon type="close" /></a>
                    </Popconfirm>
                ),
            }];

        return (

            <div className="">
                <Card
                    title="专题内容管理"
                >
                    <Table
                        title={() => (`专题名称：${this.state.subjectName}`)}
                        showHeader={false}
                        pagination={false}
                        className="themecontrol-table"
                        columns={columns}
                        dataSource={this.state.dataSource}
                    /><br />
                    <Button type="primary" style={{ width: 60 }} icon="plus" onClick={this.showModal} />
                </Card>

                <Modal
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={700}
                >
                    <Spin spinning={this.state.Adding}>
                        <Row>
                            <Col span={11}>
                                <Search style={{ marginBottom: 8 }} placeholder="Search" onSearch={this.onSearch} enterButton />
                                <div style={{ overflow: 'auto', height: 500 }}>
                                    <DirectoryTree
                                        defaultExpandedKeys={['0']}
                                        onSelect={this.onSelect}
                                    >
                                        {this.renderTreeNodes(this.state.treeData)}
                                    </DirectoryTree>
                                </div>
                            </Col>
                            <Col span={2}><Divider type="vertical" /></Col>
                            <Col span={11}>
                                <div style={{ overflow: 'auto', height: '530px', marginTop: '20px' }}>
                                    <Spin spinning={this.state.loading}>
                                        {
                                            this.state.radioData.length > 0 ?
                                                <RadioGroup onChange={this.onChange}>
                                                    {this.renderRadios(this.state.radioData)}
                                                </RadioGroup>
                                                : <p style={{ textAlign: 'center' }}>No Data</p>
                                        }
                                    </Spin>
                                </div>
                            </Col>
                        </Row>
                    </Spin>
                </Modal>
            </div>
        )
    }
}

export default ThemeContent;