import React from 'react';
import WarehouseForm from './warehouseForm';
import { Card } from 'antd';

class ChangeWarehouse extends React.Component {

    state = {
        data: [this.props.state]
    }

    componentDidMount() {
        this.requestList();
    }

    CabinetFormRef = (formRef) => {
        this.cabinet_formRef = formRef;
    }

    requestList = () => {
        const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/staffM/organizationM';
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
                data.data.data.forEach((item) => {
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

    WarehouseFormRef = (formRef) => {
        this.warehouse_formRef = formRef;
    }

    render() {
        const { data } = this.state;
        return (
            <div className="">
                <Card
                    title="修改仓库"
                >
                    <WarehouseForm
                        wrappedComponentRef={this.WarehouseFormRef}
                        type="change"
                        initialValues={data[0]}
                        onSubmit={() => { console.log(this.warehouse_formRef.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default ChangeWarehouse;