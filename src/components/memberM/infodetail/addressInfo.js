import React from 'react';
import { Table, Collapse, Tag } from 'antd';

const Panel = Collapse.Panel;
class AddresssInfo extends React.Component {
    state = {}

    render() {
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        const caseCol = [
            {
                title: '书柜名称', dataIndex: 'caseName', render: (text, record) => (
                    <span>{text}&emsp;{record.default ? <Tag color="#2db7f5" key='default'>默认</Tag> : ''}</span>
                )
            },
            { title: '书柜编号', dataIndex: 'caseID' },
            { title: '书柜地址', dataIndex: 'caseAddr' },
        ];
        const recevieCol = [
            {
                title: '收件人', dataIndex: 'recipient', render: (text, record) => (
                    <span>{text}&emsp;{record.default ? <Tag color="#2db7f5" key='default'>默认</Tag> : ''}</span>
                )
            },
            { title: '收件人电话', dataIndex: 'phone' },
            { title: '收货地址', dataIndex: 'recevieAddr' },
        ];
        return (
            <div>
                <Collapse
                    bordered={false}
                >
                    <Panel header="书柜" key="1" style={customPanelStyle}>
                        <Table
                            dataSource={[{ key: 1, default: true, caseName: '万科社区1柜', caseID: '457', caseAddr: '东方红卡的说法叫快递收发开始发动机卡是否' }]}
                            bordered
                            columns={caseCol}
                        />
                    </Panel>
                    <Panel header="收货地址" key="2" style={customPanelStyle}>
                        <Table
                            dataSource={[{ key: 1, default: true, recipient: '王五', phone: '13456787463', recevieAddr: '东方红卡的说法叫快递收发开始发动机卡是否' }]}
                            bordered
                            columns={recevieCol}
                        />
                    </Panel>
                </Collapse>
            </div >
        );
    }
}
export default AddresssInfo;