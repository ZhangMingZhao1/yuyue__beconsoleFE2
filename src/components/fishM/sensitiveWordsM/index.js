import React from 'react';
import { Card, Input, Button, Modal, message } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const confirm = Modal.confirm;

class SensitiveWordsM extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sensitiveWords: [],
      words: [],
      disabled: true,
      editing: false
    };
  }

  componentDidMount() {
    this.requestList();
  }

  onChange = (e) => {
    this.setState({
      sensitiveWords: e.target.value.split('|')
    });
  }

  handleSaveBtnClick = () => {
    const { sensitiveWords, words } = this.state;
    const changeWords = [];
    for (let i = 0, ilen = sensitiveWords.length; i < ilen; i++) {
      for (let j = 0, jlen = words.length; j < jlen; j++) {
        if (sensitiveWords[i] === words[j]) {
          sensitiveWords.splice(i, 1);
          words.splice(j, 1);
        }
      }
    }
    if (sensitiveWords !== []) {
      changeWords.push(...sensitiveWords);
    } else {
      changeWords.push(...words);
    }
    const url = 'http://119.3.231.11:8080/yuyue/addSensitive';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word: sensitiveWords
      })
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        if (data.data) {
          message.success('保存成功');
        } else {
          message.error(`${data.message}`);
        }
      })
      .catch(err => {
        console.log('fetch error', err);
      });
    this.setState(() => ({
      disabled: true,
      editing: false
    }));
    // this.requestList();
    // console.log(this.state);
  }

  handleEditBtnClick = () => {
    this.setState(() => ({
      disabled: false,
      editing: true
    }));
  }

  handleCancelBtnClick = () => {
    confirm({
      okText: '是',
      cancelText: '否',
      content: '是否放弃修改？',
      onOk: () => {
        this.setState(() => ({
          disabled: true,
          editing: false
        }));
      },
      onCancel: () => {
        console.log('Cancel');
      }
    })
  }

  requestList = () => {
    const words = [];
    const url = 'http://119.3.231.11:8080/yuyue/listSensitive';
    fetch(url)
      .then((res) => res.json())
      .then(data => {
        // console.log(data);
        data.map((item) => {
          words.push(item.word);
        });
        this.setState({
          sensitiveWords: words,
          words: words
        });
      })
      .catch(err => {
        console.log('fetch error', err);
      });
  }

  render() {
    const { editing, sensitiveWords } = this.state;
    const value = sensitiveWords.join('|');
    return (
      <React.Fragment>
        <BreadcrumbCustom first="鱼群管理" second="敏感词管理" />
        <div>
          <Card title="敏感词库">
            <div>
              <TextArea
                disabled={this.state.disabled}
                value={value}
                onChange={this.onChange}
                autosize={{ minRows: 6 }}
              />
              <div
                style={{ margin: '10px 40% 0px' }}
              >
                {
                  editing ?
                    <React.Fragment>
                      <Button
                        type="primary"
                        onClick={this.handleSaveBtnClick}
                      >
                        保存
                      </Button>
                      <Button
                        disabled={this.state.disabled}
                        style={{ marginLeft: '10px' }}
                        onClick={this.handleCancelBtnClick}
                      >
                        取消
                      </Button>
                    </React.Fragment>
                    :
                    <Button
                      type="primary"
                      onClick={this.handleEditBtnClick}
                      style={{ marginLeft: '20%' }}
                    >
                      修改
                    </Button>
                }
              </div>
            </div>
          </Card>
        </div>
      </React.Fragment >
    );
  }
}

export default SensitiveWordsM;
