import React from 'react';
import StaffForm from './staffForm';
import { Card } from 'antd';

class ChangeStaff extends React.Component {

    StaffFormRef = (formRef) => {
        this.staff_formRef = formRef;
    }

    render() {
        const data = {
            name: '毛大虎',
            status: '正常',
            character: '管理员',
            phoneNumber: '13901239091',
            org: '朝阳街道',
            department: '技术部',
            createTime: '2018-02-02 12:23:23',
            modifyTime: '2018-02-02 12:23:23',
        }
        return (
            <div className="">
                <Card
                    title={`修改员工：${this.props.match.params.id}`}
                >
                    <StaffForm
                        wrappedComponentRef={this.StaffFormRef}
                        type="change"
                        initialValues={data}
                        onSubmit={() => { console.log(this.staff_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default ChangeStaff;