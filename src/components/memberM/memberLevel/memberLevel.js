import React from 'react';
import { Card, InputNumber, Checkbox, Button } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './memberLevel.less';

class MemberLevel extends React.Component {
    state = {
        checkbox: [{ checked: true }, { checked: true }, { checked: true }, { checked: true }, { checked: false }, { checked: false }, { checked: true }, { checked: true, disabled: true }, { checked: true, disabled: true }],
        l11: '50',
        l21: '100', l22: '180', l23: '200', l24: '360', l25: '2',
        l31: '5', l32: '270', l33: '480', l34: '200', l35: '360', l36: '6',
        l41: '0.5',
        l51: '0.2', l52: '0.4',
        l61: '10',
        l71: '50',
        l81: '600',
        l91: '2000',
    };

    render() {
        const inputStyle = { size: 'small', style: { width: 50 } };
        const name = [['l11'], ['l21', 'l22', 'l23', 'l24', 'l25'], ['l31', 'l32', 'l33', 'l34', 'l35', 'l36'], ['l41'], ['l51', 'l52'], ['l61'], ['l71'], ['l81'], ['l91']];
        const rules = [
            '普通会员通过手机或微信或QQ或微博等直接注册，可获取##成长值。',
            'VIP会员会员费为##元/6个月，##元/12个月，分别获取##成长值和##成长值；同时处于借阅状态图书不超过##本',
            '家庭会员（不超过##会员费为：##元/6个月，##元/12个月，家庭成员每人分别获取##成长值和##成长值。同时处于借阅状态图书不超过##本。',
            '超过借阅时间，会员需按每天##元支付借书费，不足1天按1天计算。最高支付费用为所借图书定价。',
            '会员捐书成功，可按图书定价的##得积分，并按图书定价的##计算成长值，其中积分和成长值取整。',
            '会员所捐图书，被其他会员（VIP会员和家庭会员）借阅1次，捐书会员将获取##成长值。',
            '会员对于已阅读图书撰写读书笔记（要求不少于100字），每篇可获得##成长值。',
            'VIP会员分1-9个级别，按成长值累计计算，起始为1级，每级别开放不同权限。每##成长值为一个级别。',
            '家庭会员分1-5星，按所有成员成长值累计计算，起始为1星，每星级开放不同权限。每##成长值为一个级别。',
        ];

        const content = [];
        for (let i = 0; i < rules.length; i++) {
            let str = rules[i].split('#');
            let n
            for (let j = 0; j < str.length; j++) {
                if (j % 2 !== 0){
                    n = Math.floor(j/2);
                    str[j] = <InputNumber key={name[i][n]} {...inputStyle} value={this.state[name[i][n]]} onChange={(v) => {this.setState({ [name[i][n]]: v }) }} />
                }
            }
            content.push(
                <span key={i} style={{marginRight:5}}><Checkbox {...this.state.checkbox[i]}
                    onChange={(e) => { this.state.checkbox[i].checked = !this.state.checkbox[i].checked; this.forceUpdate(); }}
                /></span>);
            content.push(str);
            content.push(<br key={rules.length+i}/>);
        }
        return (
            <div className="memberLevel">
                <BreadcrumbCustom first="会员管理" second="会员等级设置" />
                <Card
                    title="会员等级设置"
                    style={{ lineHeight: 2 }}
                >
                    {content}
                    <p style={{ textAlign: 'right' }}><Button>保存</Button><Button type="primary">取消</Button></p>
                </Card>
            </div>
        );
    }
}
export default MemberLevel;