import React from 'react';
import { Form, Card, Row,Col} from 'antd';


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
        infoDetailState:[],
    };

    fetchFranInfoDetailData=()=>{
        const id = this.props.match.params.id;
        fetch(`http://localhost:8080/yuyue/frandetail/${id}`)
            .then((res)=>res.json())
            .then(data=>{
                    console.log(data[0]);
                    let tmpArr = [];
                   Object.values(data[0]).map((v,k)=>{
                        console.log('infoDetailData[k] v',infoDetailData[k],v);
                        tmpArr[infoDetailData[k]] = v;
                    })
                    console.log(tmpArr);
                    this.setState({infoDetailState:tmpArr});
                })  
            }
    

    componentDidMount() {
        this.fetchFranInfoDetailData();
    }
    render() {

        console.log('this.props.match.params.memberId;',this.props.match.params.id);
        return(
            <div>
                <Card>
                    <Row type="flex" justify="center">
                        <Col>查看</Col>
                    </Row> 
                   

                </Card>
            </div>
        )
        
    }
}
export default Form.create()(FranInfoDetail);