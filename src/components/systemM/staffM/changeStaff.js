import React from 'react';
import StaffForm from './staffForm';
import { Card } from 'antd';

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

    requestList = () => {
        const url = 'http://119.3.231.11:8080/yuyue/system/user';
        fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
            .then((res) => {
                if (res.status === 200) {//http请求成功
                    return res.json()
                } else {
                    Promise.reject(res);
                }
            })
            .then(data => {
                // eslint-disable-next-line
                data.map((item) => {
                    // eslint-disable-next-line
                    if (item.uid == this.props.match.params.id) {
                        this.setState({
                            data: [item]
                        });
                    }
                });
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
                        initialValues={data[0]}
                        onSubmit={() => { console.log(this.staff_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default ChangeStaff;