import React from 'react';
import StaffForm from './staffForm';
import { Card } from 'antd';
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
        fetch(`${URL}/system/users?id=${this.props.match.params.id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                // eslint-disable-next-line
                // data.map((item) => {

                // });
                // this.setState({
                //     data: data
                // })
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