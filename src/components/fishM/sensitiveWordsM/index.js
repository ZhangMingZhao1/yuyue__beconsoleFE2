import React from 'react';
import { Card, Input, Button, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const confirm = Modal.confirm;

class SensitiveWordsM extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      editing: false
    };
    this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this);
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
    this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
  }

  handleSaveBtnClick() {
    this.setState(() => ({
      disabled: true,
      editing: false
    }));
    console.log('Save');
  }

  handleEditBtnClick() {
    this.setState(() => ({
      disabled: false,
      editing: true
    }));
  }

  handleCancelBtnClick() {
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

  render() {
    const { editing } = this.state;
    return (
      <React.Fragment>
        <BreadcrumbCustom first="鱼群管理" second="敏感词管理" />
        <div>
          <Card title="敏感词库">
            <div>
              <TextArea disabled={this.state.disabled} autosize={{ minRows: 6 }} />
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
                      style={{ marginLeft: '20%'}}
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
