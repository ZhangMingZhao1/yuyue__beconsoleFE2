import React from 'react';
import { Table, Form, Button, Row, Col } from 'antd';

class PointRecord extends React.Component {
    state = {}

    render() {
        const columns = [
            { title: '时间', dataIndex: 'time' },
            { title: '类型', dataIndex: 'type', render: (type)=>{
                let config={
                    '1': '增加',
                    '2': '减少',
                    '3': '冻结',
                }
                return config[type];
            } },
            { title: '积分', dataIndex: 'point' },
            { title: '积分余额', dataIndex: 'pointBalance' },
            { title: '原因', dataIndex: 'reason' },
        ];

        return (
            <div>
                <Row>
                    <Col span={5}>累计总积分：7549</Col>
                    <Col span={5}>积分余额：75</Col>
                    <Col span={5}>冻结积分：75</Col>
                </Row>
                <br />
                <Table
                    dataSource={[{ key: 1 }]}
                    bordered
                    columns={columns}
                />
            </div >
        );
    }
}
export default PointRecord;