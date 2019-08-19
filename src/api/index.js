import ajax from './ajax'

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
export const reqAddUser = (user) => ajax(BASE_URL+'/manage/user/add',user,"POST")

