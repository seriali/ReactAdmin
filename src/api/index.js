import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

/*
包含应用中所有的请求接口函数的模块
 */
// const BASE_URL = "http://localhost:5000";
const BASE_URL = '';
//登录接口
/*
export function requireLogin(username,password) {
    ajax('/login',{username,password},'POST')
}*/
export const  reqLogin= (username,password) => ajax(BASE_URL+'/login',{username,password},"POST");
//添加用户
export const reqAddUser = (user) => ajax(BASE_URL+'/manage/user/add',user,"POST");
/*
jsonp请求的接口请求函数
 */
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        //发送jsonp请求
        jsonp(url,{},(err,data) => {
            // console.log(err, data);
            if (!err && data.status === 'success') {
                //取出需要的数据
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather})
            }else {
                message.error('获取天气信息失败');
            }
        })
    })
};
//获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE_URL + '/manage/category/list',{parentId});
//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax(BASE_URL + '/manage/category/add',{categoryName,parentId},'POST');
//更新分类
export const reqUpdateCategory = ({categoryName,parentId}) => ajax(BASE_URL + '/manage/category/update',{categoryName,parentId},"POST");