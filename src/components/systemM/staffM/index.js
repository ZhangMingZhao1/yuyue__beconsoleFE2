import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class StaffM extends React.Component {
    render() {
        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="员工管理" />
                <div>我是员工管理</div>
            </React.Fragment>
        );
    }
}

export default StaffM;
