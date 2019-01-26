import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class CommentM extends React.Component {

  render() {
    return (
      <div>
        <BreadcrumbCustom first="鱼群管理" second="评论管理" />
        我是评论管理
      </div>
    );
  }
}

export default CommentM;
