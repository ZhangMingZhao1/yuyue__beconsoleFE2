import React from 'react';
import { Card, Input, DatePicker, Button, Modal, Table, message, Tabs } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

class CommentM extends React.Component {

	state = {
		dynamic: [],
		commnet: [],
		selectedRowKeys1: [],  // Check here to configure the default column
		selectedRowKeys2: [],  // Check here to configure the default column
	}

	componentDidMount() {
		this.requestList();
	}

	onSelect1Change = (selectedRowKeys) => {
		console.log('selectedRowKeys1 changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys1: selectedRowKeys });
	}

	onSelect2Change = (selectedRowKeys) => {
		console.log('selectedRowKeys2 changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys2: selectedRowKeys });
	}

	dynamicDelete = () => {

	}

	requestList = () => {
		const url = 'xxx/yuyue/listUserdynamic';
		fetch(url)
			.then((res) => res.json())
			.then(data => {
				// eslint-disable-next-line
				console.log(data);
				// data.data.data.map((item, index) => {
				// 	item.key = index;
				// });
			})
			.catch(err => {
				console.log('fetch error', err)
			});
	}

	render() {

		const { selectedRowKeys1, selectedRowKeys2 } = this.state;

		const rowSelection1 = {
			selectedRowKeys1: selectedRowKeys1.sort(),
			onChange: this.onSelect1Change,
			// onSelection: this.onSelection,
		};

		const rowSelection2 = {
			selectedRowKeys2: selectedRowKeys2.sort(),
			onChange: this.onSelect2Change,
			// onSelection: this.onSelection,
		};

		const columns1 = [{
			title: '序号',
			dataIndex: 'num'
		}, {
			title: '书名',
			dataIndex: 'bookName'
		}, {
			title: '动态内容',
			dataIndex: 'contest',
			width: '320px'
		}, {
			title: '发布人',
			dataIndex: 'people'
		}, {
			title: '发布时间',
			dataIndex: 'time'
		}, {
			title: '操作',
			dataIndex: 'action',
			render: (text, record) => (
				<span>
					<a href="javascript:;">编辑评论</a>
				</span>
			)
		}];

		const columns2 = [{
			title: '序号',
			dataIndex: 'number'
		}, {
			title: '评论人',
			dataIndex: 'commentPeople'
		}, {
			title: '评论内容',
			dataIndex: 'commnet',
			width: '600px'
		}, {
			title: '发布时间',
			dataIndex: 'commentTime'
		}];

		const dynamic = [{
			num: 1,
			bookName: '《钢铁是怎样炼成的》',
			contest: '吉利李书福占戴勒姆近10%股份',
			people: '胡晓雪',
			time: '2018-02-26 15：25：00'
		}, {
			num: 2,
			bookName: '《钢铁是怎样炼成的》',
			contest: '两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议了两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议了',
			people: '胡晓雪',
			time: '2018-02-26 15：25：00'
		}];

		const comment = [{
			number: 1,
			commentPeople: '啦啦啦',
			commnet: '两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议了两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议了',
			commentTime: '2018-02-26 15：25：00'
		}, {
			number: 2,
			commentPeople: '啦啦啦',
			commnet: '两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议了两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议：2019年北京开始试点两会代表就房产税提议了',
			commentTime: '2018-02-26 15：25：00'
		}];

		return (
			<React.Fragment>
				<BreadcrumbCustom first="鱼群管理" second="评论管理" />
				<Card title="评论管理">
					<Tabs defaultActiveKey="1" onChange={this.callback}>
						<TabPane tab="动态管理" key="1">
							<Input
								placeholder="书名模糊查询"
								style={{ width: '200px' }}
							/>
							<Input
								placeholder="内容模糊查询"
								style={{ width: '200px', marginLeft: '10px' }}
							/>
							<Input
								placeholder="发布人"
								style={{ width: '150px', marginLeft: '10px' }}
							/>
							<RangePicker
								style={{ marginLeft: '10px' }}
							/>
							<Button
								type="primary"
								style={{ marginLeft: '10px' }}
							>
								查询
							</Button><br />
							<Button
								type="primary"
								style={{ marginTop: '10px' }}
								onClick={this.dynamicDelete}
							>
								批量删除
							</Button>
							<Table
								bordered
								columns={columns1}
								dataSource={dynamic}
								rowSelection={rowSelection1}
								style={{ marginTop: '10px' }}
								pagination={{
									showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
									showSizeChanger: true,
									pageSizeOptions: ['10', '20', '50']
								}}
							/>
						</TabPane>
						<TabPane tab="评论管理" key="2">
							<Input
								placeholder="内容模糊查询"
								style={{ width: '200px' }}
							/>
							<Input
								placeholder="发布人"
								style={{ width: '150px', marginLeft: '10px' }}
							/>
							<RangePicker
								style={{ marginLeft: '10px' }}
							/>
							<Button
								type="primary"
								style={{ marginLeft: '10px' }}
							>
								查询
							</Button><br />
							<Button
								type="primary"
								style={{ marginTop: '10px' }}
							>
								批量删除
							</Button>
							<Table
								bordered
								columns={columns2}
								dataSource={comment}
								rowSelection={rowSelection2}
								style={{ marginTop: '10px' }}
								pagination={{
									showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
									showSizeChanger: true,
									pageSizeOptions: ['10', '20', '50']
								}}
							/>
						</TabPane>
					</Tabs>
				</Card>
			</React.Fragment>
		);
	}
}
export default CommentM;

