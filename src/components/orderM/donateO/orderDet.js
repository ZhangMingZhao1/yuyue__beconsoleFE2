import React from 'react';
import { Divider, Modal, Row, Col } from 'antd';

const orderBase = [
    { span: 12, label: '订单ID', name: 'order_id' },
    { span: 12, label: '书籍名称', name: 'book_name' },
    { span: 12, label: 'ISDN', name: 'isbn' },
    { span: 12, label: '创建时间', name: 'create_time' },
    { span: 12, label: '会员账号', name: 'account' },
    { span: 12, label: '有效期', name: 'validity_time' },
];
const postDonate = [
    { span: 24, label: '捐书方式', name: 'donate_way' },
    { span: 12, label: '进度', name: 'd_progress' },
    { span: 12, label: '创建时间', name: 'd_create_time' },
    { span: 12, label: '寄件人', name: 'd_sender' },
    { span: 12, label: '寄件人电话', name: 'd_sender_tel' },
    { span: 24, label: '寄件地址', name: 'd_delivery_address' },
    { span: 12, label: '快递公司', name: 'd_express_company' },
    { span: 12, label: '快递编号', name: 'd_express_code' },
    { span: 12, label: '仓库管理员', name: 'd_warehouse_man' },
    { span: 12, label: '收件时间', name: 'd_receive_time' },
    { span: 12, label: '审核结果', name: 'd_check_result' },
    { span: 12, label: '书籍价格', name: 'd_book_price' },
    { span: 24, label: '审核原因 ', name: 'd_check_reason' },
];
const caseDonate = [
    { span: 24, label: '捐书方式', name: 'donate_way' },
    { span: 12, label: '进度', name: 'd_progress' },
    { span: 12, label: '创建时间', name: 'd_create_time' },
    { span: 12, label: '书柜名称', name: 'd_case_name' },
    { span: 12, label: '书柜编号', name: 'd_case_code' },
    { span: 24, label: '书柜地址', name: 'd_case_addr' },
    { span: 12, label: '运维员', name: 'd_operator' },
    { span: 12, label: '用户取书', name: 'd_take_time' },
    { span: 12, label: '仓库管理员', name: 'd_warehouse_man' },
    { span: 12, label: '入库时间', name: 'd_in_stock_time' },
    { span: 12, label: '审核结果', name: 'd_check_result' },
    { span: 12, label: '书籍价格', name: 'd_book_price' },
    { span: 24, label: '审核原因 ', name: 'd_check_reason' },
];
class OrderDet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                order_id: '4575893275834957',
                book_name: '《钢铁之城》',
                isbn: '54236788976',
                create_time: '2018-06-17  14:12:02',
                account: '132****3456',
                validity_time: '2019-06-16  14:12:02',
                donate_way: '快递',
                d_progress: '已完成',
                d_create_time: '2018-06-17  14:12:02',
                d_sender: '王五',
                d_sender_tel: '13456787463',
                d_delivery_address: '东方红卡的说法叫快递收发开始发动机卡是否',
                d_express_company: '顺丰速递',
                d_express_code: '4573454932789',
                d_warehouse_man: '李三',
                d_receive_time: '2019-06-16  14:12:02',
                d_check_result: '通过',
                d_book_price: '134元',
                d_check_reason: '东方红卡的说法叫快递收发开始发动机卡是否',
            }
        }
    }

    render() {
        const { visible, onCancel, donateWay } = this.props;
        const { data } = this.state;
        return (
            <div className="">
                <Modal
                    visible={visible}
                    onCancel={() => { onCancel() }}
                    footer={null}
                >
                    <Row>
                        {
                            orderBase.map(i => (
                                <Col key={i.name} style={{ lineHeight: '30px' }} span={i.span}>
                                    <span style={{ fontWeight: "bold" }}>{i.label}:</span>
                                    <span style={{ paddingLeft: 8 }}>{data[i.name]}</span>
                                </Col>
                            ))
                        }
                    </Row>
                    <Divider />
                    <Row>
                        {
                            donateWay === 'case' ?
                                caseDonate.map(i => (
                                    <Col key={i.name} style={{ lineHeight: '30px' }} span={i.span}>
                                        <span style={{ fontWeight: "bold" }}>{i.label}:</span>
                                        <span style={{ paddingLeft: 8 }}>{data[i.name]}</span>
                                    </Col>
                                )) :
                                postDonate.map(i => (
                                    <Col key={i.name} style={{ lineHeight: '30px' }} span={i.span}>
                                        <span style={{ fontWeight: "bold" }}>{i.label}:</span>
                                        <span style={{ paddingLeft: 8 }}>{data[i.name]}</span>
                                    </Col>
                                ))
                        }
                    </Row>
                </Modal>
            </div>

        )
    }
}

export default OrderDet;