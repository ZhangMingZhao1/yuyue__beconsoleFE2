import React from 'react';
import StaffForm from './staffForm';
import { Card } from 'antd';
import moment from 'moment';
import URL from '../../../api/config';

class ChangeStaff extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.requestList();
    }

    StaffFormRef = (formRef) => {
        this.staff_formRef = formRef;
    }
    // 遗留问题无法查询某个员工数据
    requestList = () => {
        fetch(`${URL}/system/users/${this.props.match.params.id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.createTime = moment(data.registrationtime).format('YYYY-MM-DD');
                data.beInstitution = data.beInstitution ? `${data.beInstitution.id}` : null;
                data.beDepartment = data.beDepartment ? `${data.beDepartment.id}` : null;
                data.role = data.role ? `${data.roleType}` : null;
                data.status = data.status ? `${data.status}` : null;
                this.setState({
                    data: data
                })
            })
            .catch(err => {
                console.log('fetch error', err)
            });
    }

    render() {
        const { data } = this.state;
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