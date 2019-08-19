import axios from 'axios'
import { message } from "antd";

export default function ajax(url = "", data = {}, type = 'GET') {
    let promise;
    return new Promise((resolve, reject) => {
        //执行异步ajax请求
        if (type === 'GET') {
            promise = axios.get(url,{
                params:data
            })
        }else {
            promise = axios.post(url,data)
        };
        //请求成功
        promise.then(res => {
            resolve(res);
        })
        //请求失败
        .catch(err => {
            message.error('请求出错了：' + err.message);
        })
    })
}

