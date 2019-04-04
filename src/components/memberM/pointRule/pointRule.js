import React from 'react';
import { Card, Button, Checkbox, InputNumber } from 'antd';
import './pointRule.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class PointRule extends React.Component {
    state = {
        checkbox: [{ checked: true }, { checked: true }, { checked: true }],
        r1: '1',
        r2: '100',
        r3: '0.5'
    };

    render() {
        const inputStyle = { size: 'small', style: { width: 50 } };
        const name = ['r1', 'r2', 'r3'];
        const rules = [
            '消费1元得##个积分，不足一元不计算。',
            '积分抵扣##个积分抵扣1元。',
            '每次续费时最高积分抵扣比例为##会员费；',
        ];

        const content = [];
        for (let i = 0; i < rules.length; i++) {
            let str = rules[i].split('#');
            for (let j = 0; j < str.length; j++) {
                if (j % 2 !== 0)
                    str[j] = <InputNumber key={name[i]} {...inputStyle} value={this.state[name[i]]} onChange={(v) => { this.setState({ [name[i]]: v }) }} />
            }
            content.push(
                <Checkbox key={i} {...this.state.checkbox[i]}
                    onChange={(e) => { console.log("ll"); this.state.checkbox[i].checked = !this.state.checkbox[i].checked; this.forceUpdate(); }}
                >
                    {str}
                </Checkbox>
            );
            content.push(<br key={rules.length+i}/>);
        }
        return (
            <div className="pointRule">
                <BreadcrumbCustom first="会员管理" second="积分规则设置" />
                <Card
                    style={{ lineHeight: 2 }}
                    title="积分规则设置"
                >
                    {content}
                    <p style={{ textAlign: 'right' }}><Button>保存</Button><Button type="primary">取消</Button></p>
                </Card>
            </div>
        );
    }
}
export default PointRule;