import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table} from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';
import OrderDet from './orderDet';
import { fetchGet } from '../../../axios/tools';

const { Option } = Select;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

const DonateOSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const stateSelect = ['全部', '1', '2'];
        const timeSelect = ['捐书时间', '创建时间'];
        return (
            <Form layout="inline">
                <Form.Item label='状态'>
                    {getFieldDecorator('state', { initialValue: stateSelect[0] })(
                        <Select style={{ width: 120 }}>
                            {stateSelect.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="">
                    {getFieldDecorator('time')(
                        <InputGroup compact>
                            <Select defaultValue={timeSelect[0]} style={{ width: 120 }}>
                                {timeSelect.map(i => (
                                    <Option key={i} value={i}>{i}</Option>
                                ))}
                            </Select>
                            <RangePicker />
                        </InputGroup>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery1')(
                        <Input placeholder="昵称/账号模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery2')(
                        <Input placeholder="书籍名称/ISBN模糊查询" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class DonateO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
        }
    }
    componentDidMount(){
        this.requestList();
    }
    requestList = () => {
        fetchGet({
            url: '/orderO/donateO',
            params: {
                page: 1
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource: res.result.list,
                })
            }
        })
    }
    showModal(key) {
        this.setState({ [key]: true });
    }
    closeModal(key) {
        this.setState({ [key]: false });
    }

    render() {
        const { dataSource } = this.state;
        const columns = [
            { title: '订单编号', dataIndex: 'orderId' },
            { title: '会员账号', dataIndex: 'account' },
            { title: '会员昵称', dataIndex: 'nickName' },
            { title: '书籍名称', dataIndex: 'bookName' },
            { title: '捐书方式', dataIndex: 'donateWay' },
            { title: '捐书时间', dataIndex: 'donateTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            { title: '订单状态', dataIndex: 'orderState' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => <span><a onClick={()=>{this.showModal('modal1')}}>详情</a></span>
            }];

        return (
            <div className="">
                <BreadcrumbCustom first="订单管理" second="捐书订单" />
                <Card
                    title="捐书订单"
                >
                    <DonateOSearchForm />
                    <div style={{ textAlign: 'right' }}><Button type='primary'>导出</Button></div><br />
                    <Table
                        className="donateO-table"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                        bordered
                    />
                    <OrderDet
                        visible={this.state.modal1}
                        onCancel={()=>{this.closeModal('modal1')}}
                        donateWay = 'post'
                    />
                </Card>

            </div>
        )
    }
}

export default DonateO;