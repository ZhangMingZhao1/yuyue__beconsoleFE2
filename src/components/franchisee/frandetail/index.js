import React from 'react';
import { Form, Card} from 'antd';


const FormItem = Form.Item;
class FranInfoDetail extends React.Component {
    state = {
        infoData:{},
    };

    render() {
        return(
            <div>
                <Card>
                    <div>这里是fran的细节</div>
                </Card>
            </div>
        )
        
    }
}
export default Form.create()(FranInfoDetail);