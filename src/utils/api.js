import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router'

/**
 * 定义拦截器，拦截器分两种：
 * 1. 请求拦截器 axios.interceptors.request：可以用来处理统一的请求参数，例如 JWT 字符串可以统一在请求拦截器中添加
 * 2. 响应拦截器 axios.interceptors.response：可以对响应结果进行预处理
 * 两个回调函数，第一个是请求成功的回调（http 响应码为 200），第二个是请求失败的回调
 */
axios.interceptors.response.use(success => {
    //success.status 获取到的是 HTTP 的状态码
    // success.data 获取到的是服务端返回的 JSON
    if (success.status && success.status == 200 && success.data.status == 500) {
        //业务失败，用户名或者密码输入错误的异常，会进入到这个里边来
        Message.error({message: success.data.msg})
        return;
    }
    //说明是业务处理成功，如果业务处理成功，并且返回的 JSON 中，还有 msg 属性，那么就把 msg 的内容弹出来
    if (success.data.msg) {
        Message.success({message: success.data.msg})
    }
    //返回 success.data，这样，在请求发起的地方，就可以直接获取到服务端给的 JSON 了
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了( ╯□╰ )'})
    } else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        Message.error({message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录'})
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
    return;
})

//这个是请求的公共前缀
let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params
    })
}
