import React from 'react';
import { Card, Input, Button } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { TextArea } = Input;

class SensitiveWordsM extends React.Component {

  handleSaveBtnClick() {
    console.log('save');
  }

  handleCancelBtnClick() {
    console.log('cancel');
  }

  render() {
    return (
      <div>
        <BreadcrumbCustom first="鱼群管理" second="敏感词管理" />
        <div>
          <Card title="敏感词：">
            <TextArea autosize={{ minRows: 6 }} />
            <div
              style={{ marginLeft: '40%', marginTop: '10px' }}
            >
              <Button
                type="primary"
                onClick={this.handleSaveBtnClick.bind(this)}
              >
                保存
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={this.handleCancelBtnClick.bind(this)}
              >
                取消
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default SensitiveWordsM;
