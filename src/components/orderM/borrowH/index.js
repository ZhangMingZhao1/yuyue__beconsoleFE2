import React from 'react';
import { Form, Select, Input, Button, Card, DatePicker, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';

const { Option } = Select;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

const DonateOSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const stateSelect = ['全部', '1', '2'];
        const timeSelect = ['借书时间','还书时间', '创建时间'];
        const borrowWay = ['全部',];
        const returnWay = ['全部',];
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
                <Form.Item label='借书方式'>
                    {getFieldDecorator('borrowWay')(
                        <Select style={{ width: 120 }}>
                            {borrowWay.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='还书方式'>
                    {getFieldDecorator('returnWay')(
                        <Select style={{ width: 120 }}>
                            {returnWay.map(i => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
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

class BorrowH extends React.Component {
    constructor(props) {
        super(props);
        let id = 0;
        this.state = {
            dataSource: [
                { key: id++ },
            ],
            modal1: false,
        }
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
            { title: 'ISBN', dataIndex: 'isbn' },
            { title: '电子标签', dataIndex: 'tag' },
            { title: '借书方式', dataIndex: 'borrowStyle' },
            { title: '借书时间', dataIndex: 'borrowTime' },
            { title: '还书方式', dataIndex: 'returnStyle' },
            { title: '还书时间', dataIndex: 'returnTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => <span><a>详情</a></span>
            }];

        return (
            <div className="">
                <BreadcrumbCustom first="订单管理" second="历史借阅" />
                <Card
                    title="历史借阅"
                >
                    <DonateOSearchForm />
                    <div style={{ textAlign: 'right' }}><Button type='primary'>导出</Button></div><br />
                    <Table
                        className="borrowH-table"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                        bordered
                    />
                </Card>
            </div>
        )
    }
}

export default BorrowH;