import React from 'react';
import { Card, Input, DatePicker, Button, Row, Col, Modal, Select } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import SelectTable from './SelectTable';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
const Option = Select.Option;

class CommentM extends React.Component {

  constructor(props) {
    super(props);
    this.dateRangeChange = this.dateRangeChange.bind(this);
    this.findBtnClick = this.findBtnClick.bind(this);
    this.deleteCommentBtnClick = this.deleteCommentBtnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  dateRangeChange() {
    console.log('DateRangeChanged');
  }

  findBtnClick() {
    console.log('Find');
  }

  deleteCommentBtnClick() {
    confirm({
      okText: '删除',
      cancelText: '取消',
      content: '是否确定删除2条评论？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleChange(value) {
    console.log(value);
  }

  render() {
    return (
      <React.Fragment>
        <BreadcrumbCustom first="鱼群管理" second="评论管理" />
        <div>
          <Card title="评论管理">
            <div>
              <Input
                placeholder="标题/内容模糊查询"
                style={{ width: '180px', marginLeft: '24px' }}
              />
              <Input
                placeholder="评论人"
                style={{ width: '130px', marginLeft: '10px' }}
              />
              <RangePicker
                style={{ width: '250px', marginLeft: '10px' }}
                onChange={this.dateRangeChange}
              />
              <Button
                type="primary"
                style={{ marginLeft: '10px' }}
                onClick={this.findBtnClick}
              >
                查询
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                onClick={this.deleteCommentBtnClick}
                style={{ marginLeft: '24px', marginTop: '24px', marginRight: '10px' }}
              >
                删除评论
              </Button>
              第 1 条到第 2 条，共 2 条  每页显示
              <Select
                defaultValue="10"
                onChange={this.handleChange}
                style={{ width: '65px', marginLeft: '10px', marginRight: '10px' }}
              >
                <Option value="10">10</Option>
                <Option value="20">20</Option>
                <Option value="50">50</Option>
              </Select>
              条
            </div>
            <div>
              <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                  <div className="gutter-box">
                    <Card bordered={false}>
                      <SelectTable />
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default CommentM;
