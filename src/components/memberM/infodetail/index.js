import React from 'react';
// import { Card, Button, Checkbox, InputNumber } from 'antd';

class InfoDetail extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
      }
    render() {
        let id = this.props.match.params.memberId;
        return (
            <div>
              这里是InfoDetail{id}的页面
            </div>
        );
    }
}
export default InfoDetail;