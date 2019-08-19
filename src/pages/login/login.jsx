import React, {Component} from 'react'
import './login.less'
import { Redirect } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Form, Icon, Input, Button,message } from 'antd';
import { reqLogin } from '../../api'
import memoryUtils from './../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
/*
* 登录的路由组件
* */
class Login extends Component{
    handleSubmit = (event) => {
        //阻止事件的默认行为
        event.preventDefault();
        //对所有的表单字段进行验证
        this.props.form.validateFields(async (errors, values) => {
            //校验成功
            if (!errors) {
                /*console.log('提交登录的数据',values);*/
                //请求登录
                const {username,password} = values;
                /*reqLogin(username,password).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })*/
                const response = await reqLogin(username,password);
                 const result = response.data;
                console.log(result.data);
                if (result.status === 0) {
                    message.success('登录成功');
                    memoryUtils.user = result.data;//保存在内存中
                    storageUtils.saveUser(result.data);//保存到local中
                    //跳转到后台管理页面
                    this.props.history.replace('/')
                }else {//登录失败
                    message.error(result.msg);//提示错误信息
                }

            }else {
                console.log('校验失败');
            }
        })
        //得到form对象,获取form表单的数据
        /*const value = this.props.form.getFieldsValue();*/
    };
    render() {
        //如果用户已经登录，自动跳转到管理页面
        const use = memoryUtils.user;
        if (use && use._id) {
            return <Redirect to="/"/>
        }
        //得到强大功能的form对象
        //const form = this.props.form;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React:后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true,whitespace:true, message: '用户名必须输入' },
                                    { min:4, message: '用户名至少4位!' },
                                    { max:12, message: '用户名不得超过12位!' },
                                    { pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或者下划线组成' },
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules: [{required: true,message: "请输入密码"}]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
* 1.前端表单验证
* 2.收集表单数据
* */
/*
1.高阶函数
    1）.一类特别的函数
        a.接受函数类型的参数
        b.返回值是函数
    2）.常见的setTimeout()/setInterval()，Promise,数组遍历的相关方法：forEach/filter/map/reduce/findIndex
        bind()方法,Form.create()()/getFieldDecorator()()
    3).高阶函数更新动态，更加具有扩展性
2.高阶组件
    1).本质上是一个函数
    2).接收一个组件(被包装组件),返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性
    3).作用：扩展组件的功能。
    4).高阶组件也是高阶函数，接收一个组件函数，返回一个新的组件函数。
 */
//包装Form组件生产一个新的组件：Form（Login）
//新组件会向Form组件传递一个强大的对象属性：form
const WrapLogin = Form.create()(Login);
export default WrapLogin;
