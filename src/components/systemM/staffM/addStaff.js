import React from 'react';
import StaffForm from './staffForm';
import { Card } from 'antd';

class AddStaff extends React.Component {

    StaffFormRef = (formRef) => {
        this.staff_formRef = formRef;
    }

    render() {
        return (
            <div className="">
                <Card
                    title="新增员工"
                >
                    <StaffForm
                        wrappedComponentRef={this.StaffFormRef}
                        type='add'
                        onSubmit={() => { console.log(this.staff_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default AddStaff;