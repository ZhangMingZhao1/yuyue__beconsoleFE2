import React from 'react';
import { Table } from 'antd';

class PayRecord extends React.Component {
    state = {}

    render() {
        const columns = [
            { title: '订单编号', dataIndex: 'orderID'},
            { title: '购买服务名称', dataIndex: 'serviceName'},
            { title: '支付类型', dataIndex: 'serviceType'},
            { title: '支付金额', dataIndex: 'payMoney'},
            { title: '支付时间', dataIndex: 'payTime'},
            { title: '创建时间', dataIndex: 'createTime'},
            { title: '流水号', dataIndex: 'serialNumber'},
            { title: '状态', dataIndex: 'state'},
        ];

        return (
            <div>
                <Table
                    dataSource={[{ key: 1 }]}
                    bordered
                    columns={columns}
                />
            </div >
        );
    }
}
export default PayRecord;