import React from 'react';
import moment from 'moment';
import BookLibForm from './bookLibFrom';
import { Card } from 'antd';
import Url from '../../../api/config';
import { withRouter } from "react-router-dom";

class ModifyBookLib extends React.Component {
    state = {}

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        fetch(`${Url}/book/bookinfos/${this.props.match.params.id}`, { credentials: 'include' })
            .then((res) => res.json()).then(data => {
                this.setState({
                    dataSource: {
                        ...data,
                        pubName: data.bsPublishinfo.pubName,
                        printDate: moment(data.printDate),
                        publishDate: moment(data.publishDate),
                    }
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    bookLibFormRef = (formRef) => {
        this.bookLib_formRef = formRef;
    }

    render() {
        return (
            <div className="">
                <Card
                    title="修改书目"
                >
                    <BookLibForm
                        wrappedComponentRef={this.bookLibFormRef}
                        type='modify'
                        dataSource={this.state.dataSource}
                        onSubmit={() => { console.log(this.bookLib_formRef.props.form.getFieldsValue()) }}
                        onCancel={() => { this.props.history.push('/app/bookM/bookLib') }}
                    />
                </Card>
            </div>
        )
    }
}

export default withRouter(ModifyBookLib);