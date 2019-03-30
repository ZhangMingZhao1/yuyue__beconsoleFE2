import React from 'react';
import { Table, Form, Button } from 'antd';
import { getFormItem } from '../../baseFormItem';

const BorrowRSearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'SELECT', name: 'dateType', width: '100px', list: [{ id: '1', name: '借书时间' }, { id: '2', name: '还书时间' }, { id: '3', name: '创建时间' }] },
                { type: 'DATEPICKER', name: 'date' },
                { type: 'INPUT', name: 'fuzzyQuery', placeholder: '书籍名称/电子标签模糊查询' },
            ];
            return (
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {getFormItem(form, formList)}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

class BorrowRecord extends React.Component {
    state = {}

    render() {
        const columns = [
            { title: '订单编号', dataIndex: 'orderID' },
            { title: '书籍名称', dataIndex: 'bookName' },
            { title: '电子标签', dataIndex: 'eLabel' },
            { title: '借书时间', dataIndex: 'borrowTime' },
            { title: '还书时间', dataIndex: 'returnTime' },
            { title: '创建时间', dataIndex: 'createTime' },
            { title: '订单状态', dataIndex: 'state' },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => <a onClick={() => { }}>详情</a>,
            }
        ];

        return (
            <div>
                <BorrowRSearch /><br />
                <Table
                    dataSource={[{ key: 1 }]}
                    bordered
                    columns={columns}
                />
            </div >
        );
    }
}
export default BorrowRecord;