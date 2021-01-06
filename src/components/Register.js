/*
import  React from 'react';

export class Register extends React.Component{
    render(){
        return (
            <div> Register </div>
        );
    }
}
*/

import React from 'react';
import {Form, Input,
 //   Tooltip, Cascader, Select, Row, Col, Checkbox,
    Button,
 //   AutoComplete,
    message,
} from 'antd';
//import { QuestionCircleOutlined } from '@ant-design/icons';
import { API_ROOT } from '../constants';

/*
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
 */

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const Register = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => { //(err, values)
    //    validator(e,v)=>{try throw catch}
        try{
            console.log('Received values of form: ', values);
            //fire api call
            fetch(`${API_ROOT}/signup`, {
             //   mode: "no-cors",
             /*   headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'POST, GET'
                },*/
                method: 'POST',
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
            }).then((response) => {
                if (response.ok) {
                    return response;
                }
                throw new Error(response.statusText);
            }).then((response) => {
                message.success('Registration Succeed');
                console.log(response);
            }).catch((e) => {
                message.error('Registration Failed');
                console.log(e);
            });

        }catch(err){
            alert(err);
            console.log(err);
        }
        /*
        if(!err){
            console.log('Received values of form: ', values);
            //fire api call
                fetch(`${API_ROOT}/signup`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    }),
                }).then((response) => {
                    if (response.ok) {
                        return response;
                    }
                    throw new Error(response.statusText);
                }).then((response) =>
                    response.text()
                ).then((response) => {
                    message.success('Registration Succeed');
                    console.log(response);
                }).catch((e) => {
                    message.error('Registration Failed');
                    console.log(e);
                });



        } */
    };
/*
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = React.useState([]);

    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
 */
    return (
        < Form className="register"
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            /*
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            */
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                {...tailFormItemLayout}
/*
                rules={[
                    {
                        validator: (err, values) => {
                            //fire api call
                            fetch(`${API_ROOT}/signup`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    username: values.username,
                                    password: values.password,
                                }),
                            }).then((response) => {
                                if (response.ok) {
                                    return response;
                                }
                                throw new Error(response.statusText);
                            }).then((response) =>
                                response.text()
                            ).then((response) => {
                                message.success('Registration Succeed2');
                                console.log(response);
                            }).catch((e) => {
                                message.error('Registration Failed2');
                                console.log(e);
                            });
                        }
                    },
                ]}
*/
            >
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};


//export const Register=RegistrationForm;
/*
class Registration extends React.Component{
    render(){
        return(RegistrationForm);
    }
}

const Register = Form.create()(Registration);
*/






