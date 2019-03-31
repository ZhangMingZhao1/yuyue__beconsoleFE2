import React from 'react';
import { Table, Form, Button } from 'antd';
import { getFormItem } from '../../baseFormItem';

const CommentRSearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'DATEPICKER', name: 'date' },
                { type: 'INPUT', name: 'fuzzyQuery', placeholder: '书籍名称/评论内容模糊查询' },
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

class CommentRecord extends React.Component {
    state = {}

    render() {
        const { selectedRowKeys } = this.state;
        const columns = [
            { title: '评伦时间', dataIndex: 'cmtTime' },
            { title: '评伦书籍名称', dataIndex: 'cmtBook' },
            { title: '评伦内容', dataIndex: 'comment' },
        ];

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }

        return (
            <div>
                <CommentRSearch />
                <p style={{textAlign: 'right'}}><Button type='primary'>编辑</Button></p>
                <Table
                    dataSource={[{ key: 1 }]}
                    rowSelection={rowCheckSelection}
                    bordered
                    columns={columns}
                />
            </div >
        );
    }
}
export default CommentRecord;