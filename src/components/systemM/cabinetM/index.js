import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class CabinetM extends React.Component {
    render() {
        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="机柜管理" />
                我是机柜管理
            </React.Fragment>
        );
    }
}

export default CabinetM;
