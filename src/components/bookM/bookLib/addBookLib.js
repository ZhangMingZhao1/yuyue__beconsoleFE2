import React from 'react';
import BookLibForm from './bookLibFrom';
import { Card } from 'antd';

class AddBookLib extends React.Component {

    bookLibFormRef = (formRef) => {
        this.bookLib_formRef = formRef;
    }

    render() {
        return (
            <div className="">
                <Card
                    title="新增书目"
                >
                    <BookLibForm
                        wrappedComponentRef={this.bookLibFormRef}
                        type='add'
                        onSubmit={() => { console.log(this.bookLib_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default AddBookLib;