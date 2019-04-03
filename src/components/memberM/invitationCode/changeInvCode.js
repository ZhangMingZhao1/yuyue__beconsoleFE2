import React from 'react';
import { Card } from 'antd';
import InvCodeForm from './invCodeForm';

class ChangeInvCode extends React.Component {
    InvCodeFormRef = (formRef) => {
        this.invCode_formRef = formRef;
    }

    render() {
        return (
            <div className="">
                <Card
                    title={`修改：${this.props.match.params.id}`}
                >
                    <InvCodeForm
                        wrappedComponentRef={this.InvCodeFormRef}
                        type="change"
                        onSubmit={() => { console.log(this.invCode_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default ChangeInvCode;
