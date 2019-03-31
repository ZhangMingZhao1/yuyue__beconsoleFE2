import React from 'react';
import { Form, Col, Row, Button, Table, Modal } from 'antd';
import { getFormItem } from '../../baseFormItem';

const layout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 18
    },
}

const formList = [
    { type: 'INPUTNUMBER', label: '成长值', name: 'growth' },
    { type: 'INPUTNUMBER', label: '累计积分', name: 'totalPoint' },
    { type: 'INPUTNUMBER', label: '积分余额', name: 'point' },
    { type: 'SELECT', label: '会员等级', name: 'memberLevel' },
    { type: 'INPUTNUMBER', label: '粉丝数', name: 'fanNum' },
    { type: 'INPUTNUMBER', label: '关注数', name: 'followingNum' },
    { type: 'SWITCH', label: '微信', name: 'weChat' },
    { type: 'SWITCH', label: '微博', name: 'weibo' },
    { type: 'SWITCH', label: 'QQ', name: 'qq' },
    { type: 'SWITCH', label: '评伦开关', name: 'commentSwitch' },
    { type: 'SWITCH', label: '消息开关', name: 'msgSwitch' },
    { type: 'SWITCH', label: '签到开关', name: 'signInSwitch' },
    { type: 'SWITCH', label: '阅历更新', name: 'experienceUpdateSwitch' },
    { type: 'SELECT', label: '类型', name: 'type' },
    { type: 'DATEPICKER', label: '开始时间', name: 'beginTime' },
    { type: 'DATEPICKER', label: '结束时间', name: 'endTime' },
    { type: 'INPUTNUMBER', label: '因加入家庭组未使用的累计有效天数', name: 'unUseDay' },
];
formList.map(i => i.formItemLayout = layout);

//所属家庭组表单
const formItem = {
    "familyID": { type: 'INPUT', name: 'familyID' },
    "joinDate": { type: 'DATEPICKER', name: 'joinDate' },
    "familyHost": { type: 'INPUT', name: 'familyHost' },
    "familyRole": { type: 'INPUTNUMBER', name: 'familyRole' },
    "familyLimit": { type: 'DATEPICKER', name: 'familyLimit' },
};
//家庭组详情
const baseInfo = [
    { label: '家庭名称', name: 'familyName' },
    { label: '家庭ID', name: 'familyID' },
    { label: '主成员', name: 'familyHost' },
    { label: '创建时间', name: 'createTime' },
    { label: '有效期', name: 'validDate' },
];

class EditableCell extends React.Component {
    render() {
        const { editable, form, formItem, ...restProps } = this.props;
        return (
            <td {...restProps}>
                {editable ? getFormItem(form, [formItem]) : restProps.children}
            </td>
        );
    }
}

class AccountInfo extends React.Component {
    state = {
        visible: false,
        data: {

        },
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { form } = this.props;
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const columns = [
            { title: '家庭组ID', dataIndex: 'familyID', onCell: record => ({ record, form, editable: true, formItem: formItem['familyID'] }) },
            { title: '加入时间', dataIndex: 'joinDate', onCell: record => ({ record, form, editable: true, formItem: formItem['joinDate'] }) },
            { title: '家庭组主人', dataIndex: 'familyHost', onCell: record => ({ record, form, editable: true, formItem: formItem['familyHost'] }) },
            { title: '会员角色', dataIndex: 'familyRole', onCell: record => ({ record, form, editable: true, formItem: formItem['familyRole'] }) },
            { title: '家庭组有效期', dataIndex: 'familyLimit', onCell: record => ({ record, form, editable: true, formItem: formItem['familyLimit'] }) },
            {
                title: '操作', dataIndex: 'action',
                render: (text, record) => (<a onClick={() => this.setState({ visible: true })}>查看家庭组详情</a>)
            }
        ];
        const familyDetCol = [
            { title: '成员昵称', dataIndex: 'fMember'},
            { title: '成员账号', dataIndex: 'fAccount'},
            { title: '加入时间', dataIndex: 'fjoinTime'},
        ];
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <Row>
                        {getFormItem(form, formList).map((item, index) => (
                            index < 14 ? <Col key={index} span={4}>{item}</Col> : <Col key={index} span={6}>{item}</Col>
                        ))}
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p>所属家庭组</p>
                            <Table
                                components={components}
                                dataSource={[{ key: 1 }]}
                                bordered
                                columns={columns}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'center', lineHeight: '100px' }}>
                        <Button type='primary' htmlType="submit">修改</Button>
                    </div>
                </Form>
                <Modal
                    visible={this.state.visible}
                    onCancel={() => { this.setState({ visible: false }) }}
                    footer={null}
                    width={700}
                >
                    <Row>
                        {baseInfo.map(i => (
                            <Col key={i.name} style={{ lineHeight: '30px' }} span={12}>
                                <span style={{ fontWeight: "bold" }}>{i.label}</span>
                                <span style={{ paddingLeft: 8 }}>{this.state.data[i.name]}</span>
                            </Col>)
                        )}
                    </Row><br/>
                    <Table
                        dataSource={[{ key: 1 }]}
                        bordered
                        columns={familyDetCol}
                        pagination={false}
                    />
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AccountInfo);