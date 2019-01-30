import React from 'react';
import { Card, Input, Button } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { TextArea } = Input;

class SensitiveWordsM extends React.Component {

  constructor(props) {
    super(props);
    this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this);
    this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
  }

  handleSaveBtnClick() {
    console.log('Save');
  }

  handleCancelBtnClick() {
    console.log('Cancel');
  }

  render() {
    return (
      <React.Fragment>
        <BreadcrumbCustom first="鱼群管理" second="敏感词管理" />
        <div>
          <Card title="敏感词库">
            <div>
              <TextArea autosize={{ minRows: 6 }} />
              <div
                style={{ marginLeft: '40%', marginTop: '10px' }}
              >
                <Button
                  type="primary"
                  onClick={this.handleSaveBtnClick}
                >
                  保存
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  onClick={this.handleCancelBtnClick}
                >
                  取消
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </React.Fragment >
    );
  }
}

export default SensitiveWordsM;
