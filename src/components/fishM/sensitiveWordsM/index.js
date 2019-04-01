import React from 'react';
import { Card, Input, Button, Modal, Tag, Tooltip, message } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import URL from '../../../api/config';

const { confirm } = Modal;

class SensitiveWordsM extends React.Component {

  state = {
    tags: [],
    id: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    const words = [];
    const id = [];
    fetch(`${URL}/listSensitive`)
      .then((res) => res.json())
      .then(data => {
        data.map((i) => {
          words.push(i.word);
          id.push(i.id);
        });
        this.setState({
          tags: words,
          id: id
        });
      })
      .catch(err => {
        console.log('fetch error', err);
      });
  }

  handleClose = (removedTag, index, e) => {
    e.preventDefault();
    confirm({
      title: `确定删除敏感词：${removedTag}?`,
      content: `点击确定删除敏感词：${removedTag}`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const id = this.state.id;
        const url = 'http://119.3.231.11:8080/yuyue/deleteSensitive';
        fetch(url + '?id=' + id[index])
          .then((res) => res.json())
          .then(data => {
            if (!data.code) {
              message.success('删除成功');
              this.requestList();
            } else {
              message.error(`${data.message}`);
            }
          })
          .catch(err => {
            console.log('fetch error', err);
          });
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
      const url = 'http://119.3.231.11:8080/yuyue/addSensitive';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: inputValue
        })
      })
        .then((res) => res.json())
        .then(data => {
          if (!data.code) {
            message.success('添加成功');
            this.setState({
              tags,
              id: [...state.id, data.data],
            });
          } else {
            message.error(`${data.message}`);
          }
        })
        .catch(err => {
          console.log('fetch error', err);
        });
    } else if (inputValue === '') {
      message.error('请输入敏感词');
    } else {
      message.error('该敏感词已存在');
    }
    this.setState({
      inputVisible: false,
      inputValue: ''
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <React.Fragment>
        <BreadcrumbCustom first="鱼群管理" second="敏感词管理" />
        <div>
          <Card title="敏感词库">
            <div>
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag}
                    closable
                    onClose={(e) => this.handleClose(tag, index, e)}
                    style={{ marginBottom: '8px' }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                const longTagElem = (
                  <Tooltip title={tag}>{tagElem}</Tooltip>
                );
                return isLongTag ? longTagElem : tagElem;
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text" size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {
                !inputVisible
                &&
                <Button
                  style={{ fontSize: '12px' }}
                  size="small"
                  type="dashed"
                  onClick={this.showInput}
                >
                  + 添加敏感词
                </Button>
              }
            </div>
          </Card>
        </div>
      </React.Fragment >
    );
  }
}

export default SensitiveWordsM;
