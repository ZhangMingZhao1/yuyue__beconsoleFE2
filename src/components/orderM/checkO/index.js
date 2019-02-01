import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table, Row, Col, Modal, message } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const { Option } = Select;
const confirm = Modal.confirm;

const item = [
    { type: 0, name: 'orderID', label: '订单ID' },
    { type: 0, name: 'createTime', label: '创建时间' },
    { type: 0, name: 'account', label: '会员账号' },
    { type: 0, name: 'bookName', label: '书籍名称' },
    { type: 0, name: 'tag', label: '电子标签' },
    { type: 1, name: 'progress', label: '进度', value: ['审核中', '审核通过', '审核不通过'] },
];
const checkReason = ['无'];

class CheckO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: '',
        }
    }

    onChange(e) {
        console.log(e.target.value);
        if (e.target.value != '') {
            this.setState({
                data: {
                    orderID: '4575893275834957',
                    createTime: '2018-06-17  14:12:02',
                    account: '132****3456',
                    bookName: '《钢铁之城》',
                    tag: '54236788976',
                    progress: 0,
                }
            })
        }else{
            let d = this.state;
            delete d.data;
            this.setState({...d})
        }
    }

    pass(){
        confirm({
            title: '是否确定通过?',
            okText: '确定',
            cancelText:'取消',
            onOk: () => {}
        });
    }

    failPass(){
        if(this.state.reason!=''){
            confirm({
                title: '是否确定不通过?',
                okText: '确定不通过',
                cancelText:'取消',
                onOk: () => {console.log('扣罚书籍价格')}
            });
        }else{
            message.error('请输入审核原因');
        }
    }

    render() {
        const { data, reason } = this.state;
        return (
            <div className="">
                <BreadcrumbCustom first="订单管理" second="还捐审单" />
                <Card title='还捐审单'>
                    <Row>
                        <Col span={2}>输入条码：</Col><Col span={8}><Input onChange={(e) => { this.onChange(e) }} /></Col>
                    </Row>
                    <Row style={{ margin: '10px 0' }}><Col span={12}>
                        <Card hidden={data ? false : true}>
                            <div style={{ textAlign: 'center',lineHeight: '40px' }}>书籍信息</div>
                            <Row>
                                {data ?
                                    item.map(i => (
                                        <Col key={i.name} style={{ lineHeight: '30px' }} span={12}>
                                            <span style={{ fontWeight: "bold" }}>{i.label}:</span>
                                            <span style={{ paddingLeft: 8 }}>{i.type == 0 ? data[i.name] : i.value[data[i.name]]}</span>
                                        </Col>
                                    )) : ''}
                            </Row>
                        </Card>
                    </Col></Row>
                    <Row hidden={data ? false : true}>
                        <Col span={2}>审核原因：</Col>
                        <Col span={8}>
                            <Select style={{ width: '100%' }} value={reason} onChange={(v) => { this.setState({ reason: v }) }}>
                                {checkReason.map(i => (
                                    <Option key={i} value={i}>{i}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row hidden={data ? false : true} style={{marginTop:'10px'}}><Col span={12} style={{ textAlign: 'center' }}>
                        <Button type='primary' disabled={data&&data.progress!=1? false:true} onClick={()=>{this.pass()}}>通过</Button>
                        <Button type='primary' disabled={data&&data.progress!=1? false:true} onClick={()=>{this.failPass()}}>不通过</Button>
                    </Col></Row>
                </Card>
            </div>
        )
    }
}

export default CheckO;