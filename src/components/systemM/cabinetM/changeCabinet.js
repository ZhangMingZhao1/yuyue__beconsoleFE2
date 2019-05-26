import React from 'react';
import CabinetForm from './cabinetForm';
import { Card } from 'antd';
import URL from '../../../api/config';

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
        // const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/systemM/cabinetM';
        fetch(`${URL}/system/bookcaseinfos/${this.props.match.params.id}`, {
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
                // console.log(data);
                // data.caseId=
                data.ywName = `${data.user.uid}`;
                data.beWarehouseId = data.beWarehouse ? `${data.beWarehouse.warehouseId}` : null;
                data.status = data.status === 0 || 1 ? `${data.status}` : null;
                data.cellCount = `${data.cellCount}`;
                data.allocation = `${data.allocation}`;
                // data.ywName = data.user.userName;
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
                    title={`修改机柜：${this.props.match.params.id}`}
                >
                    <CabinetForm
                        wrappedComponentRef={this.CabinetFormRef}
                        type="change"
                        initialValues={data}
                        onSubmit={() => { console.log(this.cabinet_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default ChangeCabinet;
