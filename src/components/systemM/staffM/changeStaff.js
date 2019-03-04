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
        const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/systemM/staffM';
        fetch(url)
            .then((res) => {
                if (res.status === 200) {//http请求成功
                    return res.json()
                } else {
                    Promise.reject(res);
                }
            })
            .then(data => {
                data.data.data.forEach((item) => {
                    // eslint-disable-next-line
                    if (item.ID == this.props.match.params.id) {
                        this.setState({
                            data: [...this.state.data, item]
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