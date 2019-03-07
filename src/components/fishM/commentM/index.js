import React from 'react';
import { Card, Input, DatePicker, Button, Modal, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
class CommentM extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      commentData: []
    };
    this.dateRangeChange = this.dateRangeChange.bind(this);
    this.findBtnClick = this.findBtnClick.bind(this);
    this.deleteCommentBtnClick = this.deleteCommentBtnClick.bind(this);
  }


  componentDidMount() {
    this.requestList();
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

  requestList = () => {
    const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/fishM/commentM';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentData: this.state.commentData
      })
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data.data.commentData);
        // eslint-disable-next-line
        data.data.commentData.map((item, index) => {
          item.key = index;
        });
        this.setState({
          commentData: data.data.commentData
        });
      })
      .catch(err => {
        console.log('fetch error', err)
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
                style={{ width: '180px' }}
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
                style={{ marginTop: '24px', marginRight: '10px' }}
                disabled={!hasSelected}
              >
                删除评论
              </Button>
            </div>
            <div className="gutter-box" style={{ marginTop: '10px' }}>
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
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default CommentM;

