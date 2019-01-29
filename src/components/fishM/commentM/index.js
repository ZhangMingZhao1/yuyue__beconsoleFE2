/* eslint-disable react/sort-comp */
import React from 'react';
import { Card, Input, DatePicker, Button, Row, Col, Modal, Select, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
const Option = Select.Option;
class CommentM extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      commentData: [{
        key: 1,
        number: 1,
        bookname: '钢铁是怎样炼成的',
        comment: '吉利李书福占戴勒姆近10%股份',
        commentpeople: '胡晓雪',
        time: '2018-02-26 15:25:00'
      },
      {
        key: 2,
        number: 2,
        bookname: '我的好妈妈',
        comment: '两会代表就房产税提议：2019年北京开始试点',
        commentpeople: '胡晓雪',
        time: '2018-02-26 13:54:00'
      }
      ]
    };
    this.dateRangeChange = this.dateRangeChange.bind(this);
    this.findBtnClick = this.findBtnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  dateRangeChange() {
    console.log('DateRangeChanged');
  }

  findBtnClick() {
    console.log('Find');
  }

  deleteCommentBtnClick = () => {
    confirm({
      okText: '删除',
      cancelText: '取消',
      content: `是否确定删除这 ${this.state.selectedRowKeys.length} 条评论？`,
      onOk: () => {
        let tmp = this.state.selectedRowKeys;

        // console.log('onok之前的',tmp)
        let len = tmp.length;
        let cnt = 0;

        let data = this.state.commentData;
        while (tmp.length !== 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].key === tmp[0]) {
              data.splice(i, 1);
              tmp.splice(0, 1);
              break;
            }
          }
          console.log(data);
          console.log('selectedRowKeys changed: ', tmp);
        }

        this.setState({ selectedRowKeys: [], commentData: data })

      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  handleChange(value) {
    console.log(value);
  }

  render() {
    const { selectedRowKeys, commentData } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // onSelection: this.onSelection,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const hasData = commentData.length > 0;
    const columns = [{
      title: '序号',
      dataIndex: 'number',
    }, {
      title: '书名',
      dataIndex: 'bookname',
    }, {
      title: '评论内容',
      dataIndex: 'comment',
    }, {
      title: '评论人',
      dataIndex: 'commentpeople'
    }, {
      title: '评论时间',
      dataIndex: 'time'
    }];

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
                disabled={!hasSelected || !hasData}
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
                      <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.commentData}
                      />
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
