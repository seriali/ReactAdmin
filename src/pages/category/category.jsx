import React,{ Component } from 'react'
import { Card,Table,Button,Icon,message,Modal } from 'antd';
import LinkButton from '../../components/link-button'
import {reqAddCategory, reqCategorys, reqUpdateCategory} from '../../api'
import UpdateForm from './update-form'
import AddForm from './add-form'
/*
商品分类路由
 */
class Category extends Component{
    //1.设计状态
    state = {
        loading:false,//标识是否正在加载中
        categorys:[],//一级分类列表
        parentId:'0',//父分类的ID
        subCategorys:[],//二级分类列表
        parentName:'',//父分类的名称
        showStatus:0//是否显示对话框0：都不显示，1：显示添加，2：显示更新
    };
    //1.根据parentId获取数据
    getCategorys = async (parentId) => {
        //在发请求前，显示loading
        this.setState({loading:true});
        //优先使用指定的parentId,如果没有指定使用状态中的parentId
        parentId = parentId || this.state.parentId;
        const result = await reqCategorys(parentId);
        //请求完成之后，隐藏loading
        this.setState({loading:false});
        console.log(result);
        if (result.data.status === 0) {
            const categorys = result.data.data;
            if (parentId === '0') {
                //更新一级分类列表
                this.setState({categorys});
            }else {
                //更新二级分类列表
                this.setState({
                    subCategorys:categorys
                })
            }
        }else {
            //获取列表失败
            message.error('获取分类列表失败');
        }
    };
    //2.显示指定分类的子分类列表
    showSubCates = (category) => {
        // console.log('set之前',this.state.parentId);//0
        //更新状态：state中的数据是异步更新(不会立即更新state中的数据)
        this.setState({
            parentId:category._id,
            parentName:category.name
        },() => {//在状态更新之后执行，在回调函数中能得到最新的状态数据
            this.getCategorys();
        })
    };
    //显示一级列表
    showCategorys = () => {
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[],
            showStatus:0,
        })
    };
    //显示添加对话框
    showAdd = () => {
        this.setState({showStatus:1});
    };
    //显示修改的对话框
    showUpdate = (category) => {
        //保存category
        this.category = category
        //更新状态
        this.setState({showStatus:2});
    };
    //添加分类
    addCategory = async () => {
        //得到数据
        const {parentId, categoryName} = this.form.getFieldsValue();
        //关闭对话框
        this.setState({
            showStatus:0
        })
        //重置表单
        this.form.resetFields();
        //异步请求添加分类
        const result = await reqAddCategory(categoryName,parentId);
        if (result.status == 0) {
            /*
            添加一级分类
            在当前分类列表下添加
             */
            if (parentId === this.state.parentId) {
                this.getCategorys()
            }else if (parentId === '0') {
                this.getCategorys(parentId)
            }
        }
    };
    /*
    更新分类
     */
    updateCategory = async () => {
        //得到数据
        const categoryId = this.category._id;
        const {categoryName} = this.form.getFieldsValue()
        //关闭对话框
        this.setState({
            showStatus:0
        })
        //重置表单
        this.form.resetFields()

        //异步请求更新分类
        const result = await reqUpdateCategory({categoryId,categoryName});
        if (result.status === 0) {
            //重新获取列表
            this.getCategorys()
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
                render:(category) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCates(category)}>查看子分类</LinkButton> : null}
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
        const {categorys,loading,subCategorys,parentId,parentName,showStatus} = this.state;
        //从组件中读取数据
        const category = this.category || {};
        //card的左侧标题
        const title = parentId === '0' ? '一级分类列表':(
            <span>
                <LinkButton onClick={this.showSubCates}>一级分类列表</LinkButton>
                <Icon type='arrow-right'/>
                <span>{parentName}</span>
            </span>
        );
        //card的右侧
        const extra = (
            <Button type='primary'onClick={this.showAdd}>
                <Icon type='plus' />添加
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={this.columns} bordered
                    rowKey='_id'
                    pagination={{defaultPageSize:5,showQuickJumper:true,showSizeChanger:true}}
                    loading={loading}
                />
                <Modal
                    title='添加分类'
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={() => this.setState({showStatus:0})}
                >
                <AddForm categorys={categorys} parentId={parentId} setForm={form => this.form = form}/>
                </Modal>
            </Card>
        )
    }
}

export default Category;
