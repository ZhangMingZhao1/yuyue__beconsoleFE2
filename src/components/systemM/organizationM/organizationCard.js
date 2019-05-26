
import React from 'react';
import { Form, Row, Col, Card, Button, TreeSelect, Modal } from 'antd';
import { getFormItem } from '../../baseFormItem';

//上级名称选择框
class SuperiorSelect extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            id: value.id,
        };
    }
    onChange = (id) => {
        if (!('value' in this.props)) {
            this.setState({ id });
        }
        this.triggerChange({ id });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const { disabled } = this.props;
        return (
            <TreeSelect
                showSearch
                treeDefaultExpandedKeys={["/"]}
                treeNodeFilterProp="title"
                style={{ width: "200px" }}
                value={this.state.id}
                disabled={disabled}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.props.treeData}
                onChange={this.onChange}
            />
        );
    }
}

//机构详情表单
const OrganizationForm = Form.create()(
    class extends React.Component {
        //格式化数据
        fomatData(data, result = []) {
            let count = -1;//push节点计数
            data.map((i) => {
                //消除本身节点和子节点
                if (i.key != this.props.dataSource.id) {
                    result.push({
                        title: i.title,
                        key: i.key,
                        value: i.key,
                    })
                    count++;
                    if (i.children && i.children.length > 0) {
                        result[count].children = [];
                        return this.fomatData(i.children, result[count].children);
                    }
                }
            })
            return result;
        }
        //删除
        onDelete = () => {
            let that = this;
            Modal.confirm({
                title: '是否确定删除？',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    that.props.onDelete();
                }
            });
        }
        render() {
            const { form, dataSource } = this.props;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 10 },
            };
            const formList = [
                { type: 'INPUT', label: '机构编码', name: 'id', disabled: true },
                {
                    type: 'OTHER', label: '上级名称', name: 'beInstitution', component:
                        <SuperiorSelect treeData={this.fomatData(this.props.treeData)} disabled={!this.props.editable} />
                },
                {
                    type: 'INPUT', label: '机构名称', name: 'name', rules: [
                        { required: true, message: '机构名称不为空！' }
                    ]
                },
            ].map((i) => {
                i.disabled = i.disabled || !this.props.editable;
                i.formItemLayout = formItemLayout;
                return i;
            });
            if (dataSource) {
                formList.map(i => {
                    if (i.name === 'beInstitution')
                        i.initialValue = { id: dataSource[i.name] };
                    else
                        i.initialValue = dataSource[i.name];
                })
            }
            return (
                <Form onSubmit={this.props.onSubmit}>
                    <Row>
                        {getFormItem(form, formList).map((item, index) => (
                            <Col span={24} key={index}>
                                {item}
                            </Col>
                        ))}
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        {
                            this.props.editable ?
                                <Button disabled={this.props.disabled} type="primary" htmlType="submit">保存</Button> :
                                <Button disabled={this.props.disabled} htmlType="submit">编辑</Button>
                        }
                        {
                            this.props.editable ?
                                <Button disabled={this.props.disabled} onClick={this.props.onCancel}>取消</Button> :
                                <Button disabled={this.props.disabled} type="danger" onClick={this.onDelete}>删除</Button>
                        }
                    </div>
                </Form>
            );
        }
    }
);


class OrganizationCard extends React.Component {
    state = {
        editable: false,
    }

    componentWillReceiveProps() {
        this.setState({ editable: false }, () => {
            this.ref.props.form.resetFields();//重置表单
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let form = this.ref.props.form;
        if (this.state.editable) {//保存
            form.validateFields((err, values) => {
                if (!err) {
                    if(values.beInstitution.id === "/"){
                        values.beInstitution.id = -1;//根节点传值-1
                    }
                    console.log('Received values of form: ', values);
                    this.setState({ editable: false }, () => {
                        this.props.onSave(values);
                    })
                }
            });
        } else {//编辑
            this.setState({ editable: true });
        }
    }

    onDelete = () => {
        let form = this.ref.props.form;
        this.props.onDelete(form.getFieldValue("id"));
    }

    onCancel = () => {
        this.setState({ editable: false }, () => {
            this.ref.props.form.resetFields();//重置表单
        })
    }

    render() {
        return (
            <Card title="维护机构">
                <OrganizationForm
                    wrappedComponentRef={(ref) => { this.ref = ref }}
                    dataSource={this.props.dataSource}
                    treeData={this.props.treeData}//机构名称的树选择器
                    editable={this.state.editable}//是否可编辑
                    onDelete={this.onDelete}//删除按钮
                    onCancel={this.onCancel}//取消按钮
                    onSubmit={this.onSubmit}//保存和编辑
                    disabled={this.props.dataSource.id ? false : true}//无数据时，禁用按钮
                />
            </Card>
        )
    }
}
export default OrganizationCard;