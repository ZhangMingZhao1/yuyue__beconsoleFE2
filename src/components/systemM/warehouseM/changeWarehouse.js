import React from 'react';
import WarehouseForm from './warehouseForm';
import { Card } from 'antd';
import moment from 'moment';
import URL from '../../../api/config';

class ChangeWarehouse extends React.Component {

    state = {
        warehouseData: {}
    }

    componentDidMount() {
        this.requestList();
        console.log(this.props)
    }

    requestList = () => {
        fetch(`${URL}/getWarehouse?warehouseId=${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.warehouseId = `${data.warehouseId}`;
                data.operatorId = `${data.operatorId}`;
                data.departmentId = data.beDepartment ? `${data.beDepartment.id}` : null;
                data.updateTime = moment(data.updateTime).format('YYYY-MM-DD');
                this.setState({
                    warehouseData: data
                });
            })
            .catch(err => {
                console.log('fetch error', err);
            });
    }

    WarehouseFormRef = (formRef) => {
        this.warehouse_formRef = formRef;
    }

    render() {
        const { warehouseData } = this.state;
        return (
            <div className="">
                <Card
                    title={`修改仓库：${this.props.match.params.id}`}
                >
                    <WarehouseForm
                        wrappedComponentRef={this.WarehouseFormRef}
                        type="change"
                        initialValues={warehouseData}
                    />
                </Card>
            </div>
        )
    }
}

export default ChangeWarehouse;