import React from 'react';
import moment from 'moment';
import StaffForm from './staffForm';
import { Card } from 'antd';

class ChangeStaff extends React.Component {

    StaffFormRef = (formRef) => {
        this.staff_formRef = formRef;
    }

    render() {
        const dateFormat = 'YYYY/MM/DD';
        const data = {
            publish: '新华出版社',
            category: '儿童',
            isSelected: '是',
            printTime: moment('2015/01/01', dateFormat),
            clc: '儿童',
            createTime: '2018-02-02 12:23:23',
            modifyTime: '2018-02-02 12:23:23',
        }
        return (
            <div className="">
                <Card
                    title={`修改员工${this.props.match.params.id}`}
                >
                    <StaffForm
                        wrappedComponentRef={this.bookLibFormRef}
                        type='change'
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