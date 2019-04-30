
import React from 'react';
import { Form, Button, Card, Table, Row, Col } from 'antd';
import './index.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';

const StoreQuerySearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 15 },
                },
            };
            const formList = [
                { type: 'SELECT', label: '仓库/柜子', name: 'storeORcase', list: [] },
                { type: 'SELECT', label: '图书分类', name: 'category', list: [] },
                { type: 'INPUT', label: '货位/格子', name: 'location' },
                { type: 'INPUT', label: 'ISBN', name: 'isbn' },
                { type: 'INPUT', label: '电子标签', name: 'rfid' },
                { type: 'INPUT', label: '出版社', name: 'publisher' },
                { type: 'INPUT', label: '书名', name: 'bookName' },
                { type: 'INPUT', label: '作者', name: 'author' },
                { type: 'SELECT', label: '状态', name: 'state', list: [] },
            ].map(i => ({ ...i, formItemLayout: formItemLayout }));
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        {getFormItem(form, formList).map(i => <Col span={8}>{i}</Col>)}
                    </Row>
                    <div style={{textAlign: "right"}}>
                        <Button style={{marginRight: '50px'}} type="primary" htmlType="submit">查询</Button>
                    </div>
                </Form>
            );
        }
    }
);

class StoreQuery extends React.Component {

    render() {
        let id = 0;
        const columns = [
            { title: '序号', dataIndex: 'index' },
            { title: '书名', dataIndex: 'bookName' },
            { title: '作者', dataIndex: 'author' },
            { title: '电子标签', dataIndex: 'rfid' },
            { title: 'ISBN', dataIndex: 'isbn' },
            { title: '图书分类', dataIndex: 'category' },
            { title: '状态', dataIndex: 'state' },
            { title: '成本价', dataIndex: 'cost' },
            { title: '仓库/柜子', dataIndex: 'storeORcase' },
            { title: '货位/格子', dataIndex: 'location' },
        ];

        return (
            <div className="">
                <BreadcrumbCustom first="仓库管理" second="库存查询" />
                <Card
                    title="库存查询"
                >
                    <StoreQuerySearch />
                    <Table
                        columns={columns}
                        dataSource={[]}
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

export default StoreQuery;