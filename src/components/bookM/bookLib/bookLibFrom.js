import React from 'react';
import { Form, Button, Row, Col, Select } from 'antd';
import { getFormItem, getOptionList } from '../../baseFormItem';
import moment from 'moment';

//基因Input
class GeneInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return { ...(nextProps.value || {}) };
        }
        return null;
    }
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            genes: value.genes || [],
            geneConfig: [{ id: '0', name: '文艺' }, { id: '1', name: '二次元' }]
        };
    }
    handleChange = (genes) => {
        if (!('value' in this.props)) {
            this.setState({ genes });
        }
        this.triggerChange({ genes });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        const { genes, geneConfig } = this.state;
        return (
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                value={genes}
                onChange={this.handleChange}
            >
                {getOptionList(geneConfig)}
            </Select>
        );
    }
}


const BookLibForm = Form.create()(
    class extends React.Component {
        render() {
            const { dataSource, form } = this.props;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formList = [
                { type: 'INPUT', label: '名称', name: 'bookName', width: '300px' },
                { type: 'INPUT', label: 'ISBN', name: 'isbn', width: '300px' },
                { type: 'SELECT', label: '出版社', name: 'pubName', width: '100px', list: [] },
                { type: 'SELECT', label: '分类', name: 'categoryName', width: '100px', list: [] },
                { type: 'INPUT', label: '作者', name: 'author', width: '300px' },
                { type: 'SELECT', label: '是否精选', name: 'recommend', width: '100px', list: [{ id: 0, name: '否' }, { id: 1, name: '是' }] },
                { type: 'DATEPICKER', label: '印刷时间', name: 'printDate' },
                { type: 'DATEPICKER', label: '出版时间', name: 'publishDate' },
                { type: 'INPUTNUMBER', label: '页数', name: 'pages', width: '100px', extra: '页' },
                { type: 'INPUT', label: '规格', name: 'standard', width: '300px' },
                { type: 'INPUT', label: '版次', name: 'edition', width: '300px' },
                { type: 'INPUT', label: '印次', name: 'printNum', width: '300px' },
                { type: 'INPUTNUMBER', label: '价格', name: 'price', width: '100px', extra: '元' },
                { type: 'INPUTNUMBER', label: '评分', name: 'score', width: '100px', help: '(0-5分)' },
                { type: 'INPUTNUMBER', label: '浏览次数', name: 'browseCount', width: '100px' },
                { type: 'INPUTNUMBER', label: '搜索次数', name: 'searchCount', width: '100px' },
                { type: 'INPUTNUMBER', label: '重量', name: 'weight', width: '100px', extra: 'Kg' },
                { type: 'INPUT', label: '中图分类', name: 'clcNo', width: '100px' },
                { type: 'UPLOAD', label: '缩略图', name: 'thumbnailUrl', width: '100px', help: '建议204*262像支持jpg,png格式' },
                { type: 'UPLOAD', label: '童书简图', name: 'thumbnailUrl2', width: '100px', help: '建议330*250像支持jpg,png格式' },
                { type: 'OTHER', label: '基因', name: 'gene', component: <GeneInput />, initialValue: { genes: ["文艺(8)", "二次元(8)", "科普(1)"] }, help: "最多选择10个基因", formItemLayout: { labelCol: { span: 2 }, wrapperCol: { span: 22 } } },
                { type: 'TEXTAREA', label: '简介', name: 'summary', row: 100, formItemLayout: { labelCol: { span: 2 }, wrapperCol: { span: 22 } } },
            ].map((i) => {
                i.formItemLayout = i.formItemLayout || formItemLayout;
                return i;
            });
            if (dataSource) {
                formList.forEach(i => {
                    i.initialValue = dataSource[i.name];
                })
            }
            return (
                <Form onSubmit={(e) => { this.props.onSubmit(e) }}>
                    <Row>
                        {getFormItem(form, formList).map((item, index) => (
                            <Col span={index < formList.length - 2 ? 12 : 24} key={index}>
                                {item}
                            </Col>
                        ))}
                    </Row>
                    <Row hidden={this.props.type == 'modify' ? false : true}>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="创建时间"
                            >
                                <span style={{ marginLeft: 10 }}>{dataSource ? moment(dataSource['createTime']).format("YYYY-MM-DD HH:mm:ss") : null}</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="最近修改时间"
                            >
                                <span style={{ marginLeft: 10 }}>{dataSource ? moment(dataSource['updateTime']).format("YYYY-MM-DD HH:mm:ss") : null}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType='submit'>提交</Button>
                        <Button type="primary" onClick={() => { this.props.onCancel() }}>取消</Button>
                    </div>
                </Form>
            );
        }
    }
);
export default BookLibForm;