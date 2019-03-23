/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Card, Table, Divider, Tag, Input, Button, Icon, Modal, Switch, message, Popconfirm } from 'antd';
import './index.less';
import Url from '../../../api/config';
import ThemeInfoModal from './infoModal.js';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom'
import pagination from '../../pagination';

class ThemeControl extends React.Component {
  state = {
    searchText: '',
    visible: false,
  };
  params = {
    currentPage: 1,//当前页面
    pageSize: 10,//每页大小
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    fetch(`${Url.ceshiURL}/subject?start=${this.params.currentPage - 1}&size=${this.params.pageSize}`)
      .then((res) => res.json()).then(result => {
        let data = result;
        this.setState({
          pagination: pagination(data, (current) => {//改变页码
            this.params.currentPage = current;
            this.requestList()
          }, (size) => {//pageSize 变化的回调
            this.params.pageSize = size;
          }),
          dataSource: data.content.map(i => ({
            key: i.booksubjectId,
            subjectName: i.subjectName,
            isShow: i.isShow,
            sort: i.sort
          }))
        })
      }).catch((err) => {
        console.log(err);
      })
  }

  handleOk = (form, key) => {
    if (this.state.modalType === 'add') {//新增专题
      this.handleAdd(form);
    } else {//修改专题
      this.handleModify(form, key);
    }
  }

  handleCancel = (form) => {
    form.resetFields();//重置表单
    this.setState({
      visible: false,
    });
  }

  //新增专题
  handleAdd = (form) => {
    let values = form.getFieldsValue();
    values = { ...values, isShow: values.isShow ? 1 : 0 }
    fetch(`${Url.ceshiURL}/addsubject`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;'
      },
      body: JSON.stringify(values)
    }).then((res) => res.json()).then(result => {
      if (result.code === 0) {
        message.success("新增成功 " + JSON.stringify(result.data))
        form.resetFields();//重置表单
        this.setState({ visible: false });
        this.requestList();//刷新页面
      } else {
        message.error(result.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //修改专题
  handleModify = (form, key) => {
    let values = form.getFieldsValue();
    values = { ...values, isShow: values.isShow ? 1 : 0 }
    fetch(`${Url.ceshiURL}/updatesubject`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ booksubjectId: key, ...values })
    }).then((res) => res.json()).then(result => {
      if (result.code === 0) {
        console.log(result.data)
        message.success("修改成功 " + JSON.stringify(result.data))
        form.resetFields();//重置表单
        this.setState({ visible: false });
        this.requestList();//刷新页面
      } else {
        message.error(result.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //删除专题
  handleDel = (key) => {
    fetch(`${Url.ceshiURL}/deletesubject?booksubjectId=${key}`)
      .then((res) => res.json()).then(result => {
        if (result.code === 0) {
          console.log(result.data)
          message.success("删除" + JSON.stringify(result.data) + "成功")
          this.requestList();//刷新页面
        } else {
          message.error(result.message)
        }
      }).catch((err) => {
        console.log(err)
      })
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
      dataIndex: 'subjectName',
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
      dataIndex: 'isShow',
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
      //启用？ sort+1000：sort
      sorter: (a, b) => (((Math.abs(a.isShow - 1)) * 1000 + a.sort) - (Math.abs(b.isShow - 1) * 1000 + b.sort)),
      sortOrder: 'ascend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <a
            onClick={() => {
              this.setState({
                modalType: 'modify',
                modalData: { ...record, isShow: record.isShow === 0 ? false : true },//isShow数据格式装换 int->boolean
                visible: true
              })
            }}>
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否确定删除？" okText="删除" cancelText="取消" onConfirm={() => { this.handleDel(record.key) }}>
            <a ref="javascript:;">删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Link to={`${this.props.match.url}/content/${record.key}`}>专题内容管理</Link>
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
          data={this.state.modalData}
        />
      </div>
    )
  }
}

export default ThemeControl;