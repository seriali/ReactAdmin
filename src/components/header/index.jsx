import React,{ Component } from 'react'
import dateUtils from '../../utils/dateUtils'
import './index.less'
/*
顶部菜单栏组件
 */
class Index extends Component{
    state = {
        currentTime:dateUtils(Date.now())
    }
    render() {
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，admin</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>2019-08-19 13:40</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;
