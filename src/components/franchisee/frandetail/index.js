import React from 'react';
import { Form, Card, Row,Col, Divider} from 'antd';
import { RFC_2822 } from 'moment';
import URL from '../../../api/node_config';

const FormItem = Form.Item;
const infoDetailData = [
    "id",
    "编号",
    "名称",
    "等级",
    "状态",
    "类型",
    "证照类型",
    "证照号码",
    "注册地址",
    "通讯地址",
    "法人",
    "电话",
    "邮箱",
    "联系人",
    "电话",
    "邮箱",
    "账户名",
    "账号",
    "开户行",
    "备注",
    "创建人",
    "创建时间",
    "修改人",
    "修改时间",
];
class FranInfoDetail extends React.Component {
    state = {
        infoDetailState:{},
    };

    fetchFranInfoDetailData=()=>{
        const id = this.props.match.params.id;
        fetch(`${URL}/frandetail/${id}`)
            .then((res)=>res.json())
            .then(data=>{
                    console.log('data[0])',data[0]);
                    let tmpArr = {};
                   Object.values(data[0]).map((v,k)=>{
                        // console.log('infoDetailData[k] v',infoDetailData[k],v);
                        tmpArr[infoDetailData[k]] = v;
                    })
                    console.log('tmpArr',tmpArr);
                    this.setState({infoDetailState:tmpArr});
                })  
            }
    

    componentDidMount() {
        this.fetchFranInfoDetailData();
    }
    render() {

        console.log('this.props.match.params.memberId;',this.props.match.params.id);
        let dataA = Object.keys(this.state.infoDetailState);  
        let dataB = Object.values(this.state.infoDetailState);
        let len = dataA.length;
        let resDom = [];
        for(let i = 0; i < len; i++) {
            resDom.push(<Col>{dataA[i]}:{dataB[i]}</Col>)
        }
        console.log('dataA dataB',dataA , dataB);
        console.log('resDom ',resDom);
        return(
            <div>
                <Card>
                    <Row type="flex" justify="center">
                        <Col>查看</Col>
                    </Row> 
                   <Divider></Divider>
                    {resDom}   
                </Card>
            </div>
        )
        
    }
}
export default Form.create()(FranInfoDetail);