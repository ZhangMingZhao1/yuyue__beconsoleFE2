import React from 'react';
import { Divider, Modal, Row, Col } from 'antd';

const orderBase = [
    { span: 12, label: '订单ID', name: 'orderNo' },
    { span: 12, label: '书籍名称', name: 'bookName' },
    { span: 12, label: 'ISDN', name: 'isbn' },
    { span: 12, label: '创建时间', name: 'donateTime' },
    { span: 12, label: '会员账号', name: 'vipNo' },
    { span: 12, label: '有效期', name: 'validity_time' },
];
const postDonate = [
    { span: 24, label: '捐书方式', name: 'deliverType' },
    { span: 12, label: '进度', name: 'status' },
    { span: 12, label: '创建时间', name: 'donateTime' },
    { span: 12, label: '寄件人', name: 'contact' },
    { span: 12, label: '寄件人电话', name: 'phone' },
    { span: 24, label: '寄件地址', name: 'donateDet' },
    { span: 12, label: '快递公司', name: 'd_express_company' },
    { span: 12, label: '快递编号', name: 'expressNo' },
    { span: 12, label: '仓库管理员', name: 'd_warehouse_man' },
    { span: 12, label: '收件时间', name: 'd_receive_time' },
    { span: 12, label: '审核结果', name: 'd_check_result' },
    { span: 12, label: '书籍价格', name: 'd_book_price' },
    { span: 24, label: '审核原因 ', name: 'd_check_reason' },
];
const caseDonate = [
    { span: 24, label: '捐书方式', name: 'deliverType' },
    { span: 12, label: '进度', name: 'status' },
    { span: 12, label: '创建时间', name: 'donateTime' },
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

    render() {
        const { visible, onCancel, donateWay, data } = this.props;
        return (
            <div className="">
                <Modal
                    width={600}
                    visible={visible}
                    onCancel={onCancel}
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