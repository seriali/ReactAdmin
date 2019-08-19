import React,{ Component } from 'react'
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import './index.less'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu;
/*
左侧导航菜单栏组件
 */
class Index extends Component{
    render() {
        return (
            <div className="left-nav">
                <Link to='/home' className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>后台管理平台</h1>
                </Link>
                <Menu mode="inline" theme="dark">
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>商品</span></span>}>
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type="pie-chart" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to='/product'>
                                <Icon type="pie-chart" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default Index;
