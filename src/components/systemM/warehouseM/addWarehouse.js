import React from 'react';
import WarehouseForm from './warehouseForm';
import { Card } from 'antd';

class AddWarehouse extends React.Component {

    WarehouseFormRef = (formRef) => {
        this.warehouse_formRef = formRef;
    }

    render() {
        return (
            <div className="">
                <Card
                    title="新增仓库"
                >
                    <WarehouseForm
                        wrappedComponentRef={this.WarehouseFormRef}
                        type="add"
                        onSubmit={() => { console.log(this.warehouse_formRef.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default AddWarehouse;