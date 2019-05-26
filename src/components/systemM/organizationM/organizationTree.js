import React from 'react';
import { Tree, Input, Button, message } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

//获取父节点的key值
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

//将树形结构转换成线性结构的数组
const generateList = (data, list = []) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        list.push({ key: node.key, title: node.title });
        if (node.children) {
            generateList(node.children, list);
        }
    }
    return list;
};

//返回包含key值的父节点和 key值本身节点
const getParentNode = (key, tree) => {
    let result;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            node.children.map(({ ...item }) => {
                if (item.key === key) {
                    delete item.children;
                    result = { ...node, children: item };
                }
            })
            result = result || getParentNode(key, node.children);
        }
    }
    return result;
};

class OrganizationTree extends React.Component {
    state = {
        treeData: this.props.treeData,
        treeList: [],//机构数据的线性数组
        expandedKeys: [],//展开的节点keys
        searchValue: '',//搜索关键词
        autoExpandParent: true,
        selectedKeys: [],//选中状态的key值
        isAdding: false,//是否正在编辑新增节点
        addNodeName: "",//新增节点的名称
        addNodeParent: [],//新增节点的父节点
    }

    componentDidMount() {
        this.setState({
            treeList: generateList(this.state.treeData),
        })
    }

    componentWillReceiveProps(v) {
        this.setState({
            treeData: v.treeData,
            treeList: generateList(v.treeData),
        })
    }

    /**
     * 增加机构
     */
    handleAdd = () => {
        let id = parseInt(this.state.selectedKeys[0]);
        let name = this.state.addNodeName;
        if (name === "") {
            message.error("名称不能为空!");
            return;
        }
        this.props.onAdd(id, name).then(() => { this.setState({ addNodeName: "", isAdding: false }) });
    }

    //展开某一节点
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    /**
     * 关键词过滤
     */
    onChange = (e) => {
        const value = e.target.value;
        const { treeList, treeData } = this.state;
        const expandedKeys = treeList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, treeData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);//过滤掉相同的key值
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    //节点是否被展开
    isExpanded = (key) => this.state.expandedKeys.indexOf(key) > -1

    //新建节点
    addNode = (key = "/", tree) => {
        //树不存在
        if (!tree) return;
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].key === key) {
                tree[i].children ? //存在孩子节点？
                    //将输入框插入第一个子节点
                    tree[i].children.splice(0, 0, { key: "##", title: "input" }) : tree[i].children = [{ key: "##", title: "input" }];
                this.isExpanded(key) ?//节点是否被展开？
                    //新增节点的父节点指向tree[i]，并展开父节点显示输入框
                    this.setState({ addNodeParent: tree[i], isAdding: true }) :
                    this.setState({ addNodeParent: tree[i], expandedKeys: this.state.expandedKeys.concat(key), isAdding: true });
            } else {
                this.addNode(key, tree[i].children);
            }
        }
    }

    //点击"增加机构"按钮
    onAddButton = () => {
        this.addNode(this.state.selectedKeys[0], this.state.treeData);
        this.setState({ treeData: this.state.treeData });
    }

    //取消增加机构
    onCancelAdd = () => {
        let children = this.state.addNodeParent.children;
        if (children[0].key === "##") {
            //删除第一个子节点，即input输入框子节点
            children.splice(0, 1);
            this.setState({ addNodeParent: this.state.addNodeParent, isAdding: false })
        }
    }

    //选中某一节点
    onSelect = (selectedKeys) => {
        this.setState({ selectedKeys }, () => {
            if (selectedKeys.length > 0) {
                let detail = getParentNode(selectedKeys[0], this.state.treeData)
                this.props.onShowDetail(detail);
            }
        });
    };

    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {
            const index = item.title.search(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            let title = {};
            if (item.key === "##") {//输入框
                title = <span >
                    <Input
                        style={{ width: "150px", borderRadius: "6px" }}
                        value={this.state.addNodeName}
                        onChange={(e) => { this.setState({ addNodeName: e.target.value }) }}
                        onPressEnter={this.handleAdd}
                        autoFocus={true}
                    />
                    <Button size="small" type="primary" shape="circle" icon="check" onClick={this.handleAdd} />
                    <Button size="small" shape="circle" icon="close" onClick={this.onCancelAdd} />
                </span>;
            } else {//搜索高亮
                title = index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{ color: '#f50' }}>{searchValue}</span>
                        {afterStr}
                    </span>
                ) : <span>{item.title}</span>;
            }
            if (item.children) {
                return (
                    //新增节点时，关闭节点的响应（disabled）
                    <TreeNode key={item.key} title={title} disabled={this.state.isAdding}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} disabled={this.state.isAdding} />;
        });
        return (
            <React.Fragment>
                <Search
                    style={{ marginBottom: 8 }}
                    placeholder="输入关键词进行过滤"
                    disabled={this.state.isAdding}//正在编辑新增节点时，失效
                    onChange={this.onChange}
                />
                <div style={{ maxHeight: "400px", overflow: 'auto' }}>
                    <Tree
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {/* 根节点不显示 */}
                        {loop(this.state.treeData[0].children)}
                    </Tree>
                </div>
                <div style={{ marginTop: '24px', textAlign: 'right' }}>
                    <Button
                        type="primary"
                        //正在编辑新增节点-> 按钮失效
                        disabled={this.state.isAdding}
                        onClick={this.onAddButton}
                    >
                        新增机构
                    </Button>
                </div>
            </React.Fragment >
        )
    }
}
export default OrganizationTree;