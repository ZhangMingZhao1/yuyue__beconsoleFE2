export default (data, onChange, onShowSizeChange)=>{
    return {
        onChange: (current) => {//改变页码
            onChange(current)
        },
        onShowSizeChange: (current, size) => {//pageSize 变化的回调
            onShowSizeChange(size);
        },
        current: data.number,//当前页
        pageSize: data.size,//页面大小
        total: data.totalElements,//总数据
        showTotal: (total, range) => {
            return `第 ${range[0]} 条到第 ${range[1]} 条，共 ${data.totalElements} 条`
        },
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50']
    }
}