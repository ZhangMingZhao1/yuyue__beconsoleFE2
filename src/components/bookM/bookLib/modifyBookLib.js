import React from 'react';
import moment from 'moment';
import BookLibForm from './bookLibFrom';
import { Card } from 'antd';

class ModifyBookLib extends React.Component {

    bookLibFormRef = (formRef) => {
        this.bookLib_formRef = formRef;
    }

    render() {
        const dateFormat = 'YYYY/MM/DD';
        const data = {
            publish: '新华出版社',
            category: '儿童',
            isSelected: '是',
            printTime: moment('2015/01/01', dateFormat),
            clc: '儿童',
            createTime: '2018-02-02 12:23:23',
            modifyTime: '2018-02-02 12:23:23',
        }
        return (
            <div className="">
                <Card
                    title={`修改书目${this.props.match.params.id}`}
                >
                    <BookLibForm
                        wrappedComponentRef={this.bookLibFormRef}
                        type='modify'
                        initialValues={data}
                        onSubmit={() => { console.log(this.bookLib_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { }}
                    />
                </Card>
            </div>
        )
    }
}

export default ModifyBookLib;