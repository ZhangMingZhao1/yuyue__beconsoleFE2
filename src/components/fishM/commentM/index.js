import React from 'react';
import { Card, Tabs } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import Dynamic from './dynamic';
import Comment from './comment';

const TabPane = Tabs.TabPane;

const CommentM = (props) => {
	return (
		<React.Fragment>
			<BreadcrumbCustom first="鱼群管理" second="评论管理" />
			<Card title="评论管理">
				<Tabs defaultActiveKey="1">
					<TabPane tab="书籍动态管理" key="1">
						<Dynamic />
					</TabPane>
					<TabPane tab="动态评论管理" key="2">
						hello world！
					</TabPane>
					<TabPane tab="评论管理" key="3">
						<Comment />
					</TabPane>
				</Tabs>
			</Card>
		</React.Fragment >
	);
}
export default CommentM;
