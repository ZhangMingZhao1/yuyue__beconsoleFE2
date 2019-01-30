import React from 'react';
import { Divider, Modal, Row, Col } from 'antd';

const orderBase = [
    { span: 12, label: '订单ID', name: 'order_id' },
    { span: 12, label: '书籍名称', name: 'book_name' },
    { span: 12, label: '电子标签', name: 'tag' },
    { span: 12, label: '创建时间', name: 'create_time' },
    { span: 12, label: '会员账号', name: 'account' },
    { span: 12, label: '有效期', name: 'validity_time' },
];
const postBorrow = [
    { span: 12, label: '借书方式', name: 'borrow_way' },
    { span: 12, label: '配送方式', name: 'b_delivery' },
    { span: 12, label: '进度', name: 'b_progress' },
    { span: 12, label: '创建时间', name: 'b_create_time' },
    { span: 12, label: '收件人', name: 'b_recipient' },
    { span: 12, label: '收件人电话', name: 'b_recipient_tel' },
    { span: 24, label: '收货地址', name: 'b_delivery_address' },
    { span: 12, label: '快递公司', name: 'b_express_company' },
    { span: 12, label: '快递编号', name: 'b_express_code' },
    { span: 12, label: '快递费', name: 'b_express_fee' },
    { span: 12, label: '快递费状态', name: 'b_express_state' },
    { span: 12, label: '仓库管理员', name: 'b_warehouse_man' },
    { span: 12, label: '寄件时间', name: 'b_send_time' },
];
const caseBorrow = [
    { span: 12, label: '借书方式', name: 'borrow_way' },
    { span: 12, label: '配送方式', name: 'b_delivery' },
    { span: 12, label: '进度', name: 'b_progress' },
    { span: 12, label: '创建时间', name: 'b_create_time' },
    { span: 12, label: '书柜名称', name: 'b_case_name' },
    { span: 12, label: '书柜编号', name: 'b_case_code' },
    { span: 12, label: '格子编号', name: 'b_cell_code' },
    { span: 12, label: '用户取书', name: 'b_take_time' },
    { span: 12, label: '仓库管理员', name: 'b_warehouse_man' },
    { span: 12, label: '出库时间', name: 'b_out_stock_time' },
    { span: 12, label: '运维员', name: 'b_operator' },
    { span: 12, label: '上柜时间', name: 'b_into_case_time' },
    { span: 24, label: '书柜地址', name: 'b_case_addr' },
];
const postReturn = [
    { span: 12, label: '还书方式', name: 'return_way' },
    { span: 12, label: '配送方式', name: 'r_delivery' },
    { span: 12, label: '进度', name: 'r_progress' },
    { span: 12, label: '创建时间', name: 'r_create_time' },
    { span: 12, label: '快递公司', name: 'r_express_company' },
    { span: 12, label: '快递编号', name: 'r_case_code' },
    { span: 12, label: '仓库管理员', name: 'r_warehouse_man' },
    { span: 12, label: '收件时间', name: 'r_recevie_time' },
    { span: 12, label: '审核结果', name: 'r_check_result' },
    { span: 12, label: '扣罚金额', name: 'r_fine' },
    { span: 24, label: '审核原因', name: 'r_check_reason' },
    { span: 12, label: '支付方式', name: 'r_pay_method' },
    { span: 12, label: '支付金额', name: 'r_pay_fee' },
    { span: 12, label: '流水号', name: 'r_serial_number' },
    { span: 12, label: '支付状态', name: 'r_pay_state' },
];
const caseReturn = [
    { span: 12, label: '还书方式', name: 'return_way' },
    { span: 12, label: '配送方式', name: 'r_delivery' },
    { span: 12, label: '进度', name: 'r_progress' },
    { span: 12, label: '创建时间', name: 'r_create_time' },
    { span: 12, label: '书柜名称', name: 'r_case_name' },
    { span: 12, label: '书柜编号', name: 'r_case_code' },
    { span: 12, label: '书柜地址', name: 'r_case_addr' },
    { span: 12, label: '运维员', name: 'r_operator' },
    { span: 12, label: '用户取书', name: 'r_take_time' },
    { span: 12, label: '仓库管理员', name: 'r_warehouse_man' },
    { span: 24, label: '入库时间', name: 'r_in_stock_time' },
    { span: 12, label: '审核结果', name: 'r_check_result' },
    { span: 12, label: '扣罚金额', name: 'r_fine' },
    { span: 12, label: '审核原因', name: 'r_check_reason' },
    { span: 12, label: '支付方式', name: 'r_pay_method' },
    { span: 12, label: '支付金额', name: 'r_pay_fee' },
    { span: 12, label: '流水号', name: 'r_serial_number' },
    { span: 12, label: '支付状态', name: 'r_pay_state' },
];
class OrderDet extends React.Component {

    render() {
        const { visible, onCancel } = this.props;
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
                                <Col style={{ lineHeight: '30px' }} span={i.span}><span style={{ fontWeight: "bold" }}>{i.label}:</span><span style={{ paddingLeft: 8 }}>订单ID</span></Col>
                            ))
                        }
                    </Row>
                    <Divider />
                    <Row>
                        {
                            orderBase.map(i => (
                                <Col style={{ lineHeight: '30px' }} span={i.span}><span style={{ fontWeight: "bold" }}>{i.label}:</span><span style={{ paddingLeft: 8 }}>订单ID</span></Col>
                            ))
                        }
                    </Row>
                    <Divider />
                    <Row>
                        {
                            orderBase.map(i => (
                                <Col style={{ lineHeight: '30px' }} span={i.span}><span style={{ fontWeight: "bold" }}>{i.label}:</span><span style={{ paddingLeft: 8 }}>订单ID</span></Col>
                            ))
                        }
                    </Row>
                </Modal>
            </div>

        )
    }
}

export default OrderDet;