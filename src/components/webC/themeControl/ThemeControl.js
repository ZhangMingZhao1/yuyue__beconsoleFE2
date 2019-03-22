/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Card, Table, Divider, Tag, Input, Button, Icon, Modal, Switch } from 'antd';
import './ThemeControl.less';
import Url from '../../../api/config';
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
            onChange: (current)=>{
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
  
  handleSwitch = (value) => {
    console.log('switch', value);
  }
  hangleOnclik = () => {
    this.showModal();
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);

    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
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
        <div style={{ margin: 10 }}><Button onClick={this.hangleOnclik}>新增</Button></div>
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

        <Modal
          title="新增专题"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Divider />
          <div>名称: <Input style={{ width: 300 }} /></div>
          <div style={{ marginTop: 15, marginBottom: 15 }}>状态: <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked onChange={this.handleSwitch} /></div>
          <div>排序： <Input style={{ width: 100 }} /></div>
          <Divider />
        </Modal>
      </div>
    )
  }
}

export default ThemeControl;