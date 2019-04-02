import React from 'react';
import { Card } from 'antd';
import InvCodeForm from './invCodeForm';

class AddInvCode extends React.Component {
    InvCodeFormRef = (formRef) => {
        this.invCode_formRef = formRef;
    }

    render() {
        return (
            <div className="">
                <Card
                    title="新增"
                >
                    <InvCodeForm
                        wrappedComponentRef={this.InvCodeFormRef}
                        type="add"
                        onSubmit={() => { console.log(this.invCode_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default AddInvCode;