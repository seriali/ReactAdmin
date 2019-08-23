import React,{ Component } from 'react'
import { formatDateTime } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from "../../api";
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConifg'
import { Modal } from 'antd';
import LinkButton from '../../components/link-button'
import './index.less'
/*
顶部菜单栏组件
 */
class Index extends Component{
    state = {
        currentTime:formatDateTime(Date.now()),//当前时间字符串
        dayPictureUrl: '',//天气的图片
        weather:'',//天气的文本
    };
    getTime(){
        //每隔1s获取当前时间，并更新状态数据的currentTime
        this.Timer = setInterval(() => {
            const currentTime = formatDateTime(Date.now());
            this.setState({currentTime})
        },1000)
    };
    /*
    第一次render之后执行，一般执行异步操作，发送请求，启动定时器
     */
    componentDidMount() {
        //获取当前时间
        this.getTime();
        this.getWeather();
    };
    getWeather = async () => {
        //调用接口请求获取异步数据
        const {dayPictureUrl,weather} = await reqWeather('北京');
        this.setState({dayPictureUrl,weather});
    };
    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key === path) {//如果当前item对象的key与path一样，item的title就是需要显示的title
                title = item.title;
            }else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) {//如果有值
                    title = cItem.title;
                }
            }
        });
        return title;
    };
    //退出登录
    logout = () => {
        //显示确认框
        Modal.confirm({
            content:'确定退出吗？',
            onOk:() => {
                //删除保存的user数据，
                storageUtils.removeUser();
                memoryUtils.user = {};
                // 跳转到login页面
                this.props.history.replace('/login');
            },
        })
    };
    /*
    当前组件卸载之前使用
     */
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.Timer);
    }

    render() {
        const {currentTime,dayPictureUrl,weather} = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle();//得到title
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>
                        退出
                    </LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Index);
