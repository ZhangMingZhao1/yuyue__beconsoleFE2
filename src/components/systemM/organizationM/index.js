import React from 'react';
import { Card, Layout, Tree, Input, Button, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const { Sider, Content } = Layout;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;

const x = 3;
const y = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {

    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(1);

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};
generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

class OrganizationM extends React.Component {

    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onChange = (e) => {
        const value = e.target.value;
        const expandedKeys = dataList.map((item) => {
            if (item.key.indexOf(value) > -1) {
                return getParentKey(item.key, gData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    editBtnClick() {
        confirm({
            okText: '确认',
            cancelText: '取消',
            content: '确认是否需要编辑该机构信息',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    deleteBtnClick() {
        confirm({
            okText: '删除',
            cancelText: '取消',
            content: '是否删除该机构信息',
            onOk() {
                console.log('Delete');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {
            const index = item.key.search(searchValue);
            const beforeStr = item.key.substr(0, index);
            const afterStr = item.key.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.key}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} />;
        });
        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="机构管理" />
                <Card title="机构管理">
                    <Layout>
                        <Sider
                            width="260"
                            style={{ background: 'white' }}
                        >
                            <div>
                                <Search
                                    style={{ width: 250 }}
                                    placeholder="输入关键词进行过滤"
                                    onChange={this.onChange}
                                />
                                <Tree
                                    onExpand={this.onExpand}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                >
                                    {loop(gData)}
                                </Tree>
                            </div>
                            <div style={{ marginLeft: '60%', marginTop: '24px' }}>
                                <Button
                                    type="primary"
                                >
                                    新增机构
                                </Button>
                            </div>
                        </Sider>
                        <Content style={{ background: 'white' }}>
                            <Card
                                title="维护机构"
                                style={{}}
                            >
                                <div style={{ margin: '10px' }}>
                                    机构代码：
                                    <Input
                                        disabled="true"
                                        value="0023"
                                        style={{ width: '200px' }}
                                        onChange={this.handleInput1Change}
                                    />
                                </div>
                                <div style={{ margin: '10px' }}>
                                    上级名称：
                                    <Input
                                        value="海淀区"
                                        style={{ width: '200px' }}
                                        onChange={this.handleInput2Change}
                                    />
                                </div>
                                <div style={{ margin: '10px' }}>
                                    机构名称：
                                    <Input
                                        value="XXX社区"
                                        style={{ width: '400px' }}
                                        onChange={this.handleInput3Change}
                                    />
                                </div>
                                <div style={{ marginLeft: '70%', marginTop: '24px' }}>
                                    <Button
                                        onClick={this.editBtnClick}
                                    >
                                        编辑
                                    </Button>
                                    <Button
                                        type="danger"
                                        onClick={this.deleteBtnClick}
                                    >
                                        删除
                                    </Button>
                                </div>
                            </Card>
                        </Content>
                    </Layout>
                </Card>
            </React.Fragment >
        );
    }
}

export default OrganizationM;
