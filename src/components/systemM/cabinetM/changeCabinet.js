import React from 'react';
import CabinetForm from './cabinetForm';
import { Card } from 'antd';

class ChangeCabinet extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.requestList();
    }

    CabinetFormRef = (formRef) => {
        this.cabinet_formRef = formRef;
    }

    requestList = () => {
        const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/systemM/cabinetM';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: this.state.data
            })
        })
            .then((res) => {
                if (res.status === 200) {//http请求成功
                    return res.json()
                } else {
                    Promise.reject(res);
                }
            })
            .then(data => {
                data.data.data.map((item) => {
                    // eslint-disable-next-line
                    if (item.ID == this.props.match.params.id) {
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
                    title={`修改机柜：${this.props.match.params.id}`}
                >
                    <CabinetForm
                        wrappedComponentRef={this.CabinetFormRef}
                        type="change"
                        initialValues={data[0]}
                        onSubmit={() => { console.log(this.cabinet_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default ChangeCabinet;
