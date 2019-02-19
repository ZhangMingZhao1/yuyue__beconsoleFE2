import server from './server';
import url from './serviceAPI.config';
 
//接口1方法
export function histOpen(data){
    return server({
        url: url.histOpen,
        method: 'post',
        dataType: "json",
	contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: data
    })
}
 
//接口2方法
export function histdata(data){
    return server({
        url: url.histdata,
        method: 'post',
        dataType: "json",
	contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: data
    })
}
