import React from 'react';
import { Card, Input, DatePicker, Button, Row, Col, Modal, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
class CommentM extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      commentData: [{
        number: 1,
        bookname: '钢铁是怎样炼成的',
        comment: '吉利李书福占戴勒姆近10%股份',
        commentpeople: '胡晓雪',
        time: '2018-02-26 15:25:00'
      },
      {
        number: 2,
        bookname: '我的好妈妈',
        comment: '两会代表就房产税提议：2019年北京开始试点',
        commentpeople: '胡晓雪',
        time: '2018-02-26 13:54:00'
      }
      ],
    };
    this.dateRangeChange = this.dateRangeChange.bind(this);
    this.findBtnClick = this.findBtnClick.bind(this);
    this.deleteCommentBtnClick = this.deleteCommentBtnClick.bind(this);
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

  deleteCommentBtnClick() {
    confirm({
      okText: '删除',
      cancelText: '取消',
      content: `是否确定删除这 ${this.state.selectedRowKeys.length} 条评论`,
      onOk: () => {
        let tmp = this.state.selectedRowKeys.sort();
        let len = tmp.length;
        let cnt = 0;
        let data = this.state.commentData;
        for (let i = 0; i < len; i++) {
          tmp[i] -= cnt;
          data.splice(tmp[i], 1);
          cnt++;
        }
        this.setState({ selectedRowKeys: [], commentData: data })

        console.log(data);
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedRowKeys.sort(),
      onChange: this.onSelectChange,
      // onSelection: this.onSelection,
    };
    const hasSelected = selectedRowKeys.length > 0;
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
                disabled={!hasSelected}
              >
                删除评论
              </Button>
            </div>
            <div>
              <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                  <div className="gutter-box">
                    <Card bordered={false}>
                      <Table
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.commentData}
                        pagination={{
                          showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                          showSizeChanger: true,
                          pageSizeOptions: ['10', '20', '50']
                        }}
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

