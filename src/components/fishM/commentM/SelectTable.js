import React from 'react';
import { Table } from 'antd';

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

const data = [];
data.push({
  key: 1,
  number: 1,
  bookname: '钢铁是怎样炼成的',
  comment: '吉利李书福占戴勒姆近10%股份',
  commentpeople: '胡晓雪',
  time: '2018-02-26 15:25:00'
});
data.push({
  key: 2,
  number: 2,
  bookname: '我的好妈妈',
  comment: '两会代表就房产税提议：2019年北京开始试点',
  commentpeople: '胡晓雪',
  time: '2018-02-26 13:54:00'
});

class SelectTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelection: this.onSelection,
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
}

export default SelectTable;
