import React, {Component} from 'react';
import {Form, Input} from "antd";
import PropTypes from 'prop-types'

class UpdateForm extends Component {
    static propTyps = {
        categoryName:PropTypes.string,
        setForm:PropTypes.func.isRequired
    };
    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {categoryName} = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName
                        })(
                            <Input placeholder="请输入分类名称" />
                        )
                    }
                </Item>
            </Form>
        );
    }
}

export default UpdateForm = Form.create()(UpdateForm);
