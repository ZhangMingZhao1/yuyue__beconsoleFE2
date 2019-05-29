import React from 'react';
import { Card, Col, Row, message } from 'antd';
import Url from '../../../api/config';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import OrganizationCard from './organizationCard';
import OrganizationTree from './organizationTree';

class OrganizationM extends React.Component {
    state = {
        treeData: [{ key: "/", title: '/', children: [] }],//Tree数据,存在根节点key="/"
        detailData: {},
    }

    componentDidMount() {
        this.requestList();
    }

    /**
     * 机构获取
     */
    requestList() {
        fetch(`${Url}/system/institutions`, { credentials: 'include' })
            .then((res) => res.json()).then(data => {
                if (data.code && data.code === 1) {
                    message.error(data.message)
                } else {
                    let tree = this.fomatData(data);
                    this.setState({
                        treeData: [{
                            key: "/",
                            title: '/',
                            children: tree,
                        }]
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    /**
     * 增加机构
     */
    handleAdd = (id, name) => {
        let reqBody = id ? {
            beInstitution: { id: id },
            name: name
        } : { name: name };
        console.log(reqBody);
        return fetch(`${Url}/system/institutions`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;'
            },
            credentials: 'include',
            body: JSON.stringify(reqBody)
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("新增成功 " + JSON.stringify(result.data))
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 修改机构
     */
    handleModify = (data) => {
        fetch(`${Url}/system/institutions`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then(result => {
            if (result.code === 0) {
                message.success("更新成功")
                this.requestList();//刷新页面
            } else {
                message.error(result.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 删除机柜
     */
    handleDelete = (key) => {
        fetch(`${Url}/system/institutions/${key}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(result => {
                if (result.code === 0) {
                    message.success("删除成功")
                    this.requestList();//刷新页面
                } else {
                    message.error(result.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //格式化目录数据
    fomatData(data) {
        return data.map(i => ({
            title: i.name,
            key: i.id.toString(),
            children: i.beInstitutions.length > 0 ? this.fomatData(i.beInstitutions) : null
        }))
    }

    //详情展示
    onShowDetail = (data) => {
        this.setState({
            detailData: {
                beInstitution: data.key,
                id: data.children.key,
                name: data.children.title
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="机构管理" />
                <Card title="机构管理">
                    <Row>
                        <Col span={8}>
                            <OrganizationTree
                                treeData={this.state.treeData}
                                onAdd={this.handleAdd}//增加机构
                                onShowDetail={this.onShowDetail}//详情显示
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <OrganizationCard
                                dataSource={this.state.detailData}
                                treeData={this.state.treeData}
                                onDelete={this.handleDelete}
                                onSave={this.handleModify}
                            />
                        </Col>
                    </Row>
                </Card>
            </React.Fragment >
        );
    }
}

export default OrganizationM;
