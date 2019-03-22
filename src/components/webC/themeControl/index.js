/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Card, Table, Divider, Tag, Input, Button, Icon, Modal, Switch, message } from 'antd';
import './index.less';
import Url from '../../../api/config';
import ThemeInfoModal from './infoModal.js';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom'

class ThemeControl extends React.Component {
  state = {
    searchText: '',
    visible: false
  };
  params = {
    currentPage: 1,
    pageSize: 10
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    fetch(`${Url.baseURL}/subject`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        size: this.params.pageSize,
        start: this.params.currentPage
      })
    }).then((res) => res.json()).then(result => {
      if (result.code === 0) {
        let data = result.data;
        this.setState({
          pagination: {
            onChange: (current) => {
              this.params.currentPage = current;
              this.requestList()
            },
            current: data.number,
            pageSize: data.size,
            total: data.totalElements,
            showTotal: (total, range) => {
              console.log(total);
              console.log(range);
              return `第 ${range[0]} 条到第 ${range[1]} 条，共 ${data.totalElements} 条`
            }
          },
          dataSource: data.content.map(i => ({
            key: i.booksubjectId,
            name: i.subjectName,
            flag: i.isShow,
            sort: i.sort
          }))
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  handleOk = (form) => {
    let values = form.getFieldsValue();
    if (this.state.modalType === 'add') {//新增专题
      fetch(`${Url.baseURL}/addsubject`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then((res) => res.json()).then(result => {
        if (result.code === 0) {
          message.success("新增成功 " + JSON.stringify(result.data))
          form.resetFields();//重置表单
          this.setState({ visible: false });
        } else {
          message.error(result.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    }else{//修改专题

    }
  }

  handleCancel = (form) => {
    form.resetFields();//重置表单
    this.setState({
      visible: false,
    });
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
    }, {
      title: '状态',
      dataIndex: 'flag',
      render: (state) => {
        let config = {
          '1': "启用",
          '0': "禁用"
        }
        return config[state];
      }
    }, {
      title: '排序',
      dataIndex: 'sort',
      sorter: (a, b) => ((Math.abs(a.flag - 1)) * 1000 + a.sort) - (Math.abs(b.flag - 1) * 1000 + b.sort),
      sortOrder: 'ascend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">修改</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
          <Divider type="vertical" />
          <Link to={`${this.props.match.url}/content`}>专题内容管理</Link>
        </span>
      ),
    }];

    return (

      <div className="">
        <BreadcrumbCustom first="网站管理" second="专题管理" />
        <div>专题管理</div>
        <div style={{ margin: 10 }}>
          <Button type='primary' onClick={() => { this.setState({ modalType: 'add', visible: true }) }}>新增</Button>
        </div>
        <Card
          title="专题管理"
        // extra={<a href="#">More</a>}
        // style={{ width: 300 }}
        >
          <Table className="themecontrol-table"
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
          />
        </Card>
        <ThemeInfoModal
          type={this.state.modalType}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
      </div>
    )
  }
}

export default ThemeControl;