import React,{ Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from 'antd';
import menuConfig from '../../config/menuConifg'
import logo from '../../assets/images/logo.png'

import './index.less'


const { SubMenu } = Menu;
/*
左侧导航菜单栏组件
 */
class Index extends Component{
    //根据menu的数据数组生成对应的标签数组
    //使用map()+递归调用
    getMenuNodes_map = (menuConfig) => {
        return menuConfig.map(item => {
            if (!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {/*递归调用*/}
                        {this.getMenuNodes_map(item.children)}
                        {/*<Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type="pie-chart" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to='/product'>
                                <Icon type="pie-chart" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>*/}
                    </SubMenu>
                )
            }
        })
    };
    //使用reduce() + 递归调用
    getMenuNodes_reduce = (menuConfig) => {
        //得到当前请求的路由路径
        const path = this.props.location.pathname;
        return menuConfig.reduce((pre,item) => {
            //向pre中添加MenuItem或者SubMenu
            if (!item.children) {
                pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
            }else {
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => cItem.key === path);
                //如果存在,说明当前item的子列表需要展开
                if (cItem) {
                    this.openKey = item.key;
                }
                pre.push((
                    <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {/*递归调用*/}
                        {this.getMenuNodes_reduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre;
        },[])
    };
    //在第一次render()之前执行一次，为第一个render()渲染准备数据(必须同步的)
    componentWillMount() {
        this.menuNodes = this.getMenuNodes_reduce(menuConfig);
    }

    render() {
        //得到当前请求的路由路径
        const path = this.props.location.pathname;
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to='/home' className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>后台管理平台</h1>
                </Link>
                <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}
/*withRouter包装非路由组件，向非路由组件传递三个属性：location,match,history*/
export default withRouter(Index);
