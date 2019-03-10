import React from 'react';
import CabinetForm from './cabinetForm';
import { Card } from 'antd';

class AddCabinet extends React.Component {

    CabinetFormRef = (formRef) => {
        this.cabinet_formRef = formRef;
    }

    render() {
        return (
            <div className="">
                <Card
                    title="新增机柜"
                >
                    <CabinetForm
                        wrappedComponentRef={this.CabinetFormRef}
                        type="add"
                        onSubmit={() => { console.log(this.cabinet_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default AddCabinet;