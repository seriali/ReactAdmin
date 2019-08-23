import React,{ Component } from 'react'
import { Card,Table,Button,Icon,message } from 'antd';
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'
/*
商品分类路由
 */
class Category extends Component{
    //1.设计状态
    state = {
        loading:false,//
        categorys:[],//一级分类列表
    };
    //获取数据
    getCategorys = async (parentId) => {
        //在发请求前，显示loading
        this.setState({loading:true});
        const result = await reqCategorys('0');
        //请求完成之后，隐藏loading
        this.setState({loading:false});
        console.log(result);
        if (result.data.status === 0) {
            const categorys = result.data.data;
            this.setState({categorys});
        }else {
            message.error('获取分类列表失败');
        }
    };
    //初始化Table的所有列数
    initColumns(){
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width:300,
                render:() => (
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            },
        ];
    };
    componentWillMount() {
        this.initColumns();
    };
    componentDidMount() {
        //发送请求
        this.getCategorys();
    }

    render() {
        //读取状态数据
        const {categorys,loading} = this.state;
        //card的左侧标题
        const title = '一级分类列表';
        //card的右侧
        const extra = (
            <Button type='primary'>
                <Icon type='plus' />添加
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={categorys}
                    columns={this.columns} bordered
                    rowKey='_id'
                    pagination={{defaultPageSize:5,showQuickJumper:true}}
                    loading={loading}
                />
            </Card>
        )
    }
}

export default Category;
