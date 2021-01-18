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
import {Link, Redirect} from "react-router-dom";
import {Login} from "./Login";

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

export const Register = (props) => { console.log(props);
    const [form] = Form.useForm();
/*
    const webpage = ()=>{
        return (<Redirect to="/login" />); //<Login toSignIn={props.toLogIn}/>
    }*/

    const [logout2login, setLogout2login] = React.useState(false); //if register successfully
 //   console.log(logout2login);

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

            //    if(props.RtoSignOut){props.RtoSignOut()}; //opt while login, press register link go to '/register' register page with logo of logout
                //submit register transfer to '/login' real login page (previously login forced to logout and need to re-login)
                //if already logout this line of code not executed as RtoSignOut func undefined

            //    console.log(props.history);
                props.history.push("/login"); //ok //needs {..props} or withroute in main.js  if Route render func instead of component register
             //   return <Redirect to="/login" />;
             //     return <Login toSignIn={props.toLogIn}/>;
             //   webpage();

            //    setLogout2login(true); //ok
            //    props.handleLogOut2LogIn();
             //   console.log(props.logout2loginM);

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
    //logout2login?<Redirect to="/login" />:( //no matter if there is or not {..props} in main.js
    //<Login toSignIn={this.props.toLogIn} /> //logout2login?<Login toSignIn={props.toLogIn}/>

 //   return props.logout2loginM?<Login toSignIn={props.RtoLogIn} handleLogOut2LogInR={props.handleLogOut2LogInR}/>:(
    //still "/register" even in loginpage to log in, even after login succesully, /register present loginpage with logout logo instead of home page
    //unless press login link to login, or press home link to login or redirect to home page
    //  & cannot go back to real register form page (handleLogOut2LogInR in login.js stack issue
    //press register link, in /register login page (presented) to log in but not direct to home page even login successasfully in '/register' login page
    //     <Login toSignIn={props.RtoLogIn} handleLogOut2LogInR={props.handleLogOut2LogInR()}/ but stack!
    //while login or logout, can redir to /register but always present login form page with/without logout logo

   // return props.logout2loginM?<Redirect to="/login" />:(
    //in "/login" in login formpage or home page; and cannot go back to real register form page (show '/register' for a sec) no matter login (home page) or log out (log in page)

  //  return logout2login?<Redirect to="/login" />:( //ok
        ////in "/login" in login formpage or home page; and can go back to real register form page (/register @ register page with/without logo if login/logout)
    //like push history -> register while login; when register succed redirect or push to /login it'll be login or home page (if user already logged in) ->register no clear already login user
    //push history - register while login, /register @ register page with logo - just like logout2login?<Redirect to="/login" />
    //ok
  //  return logout2login?<Login toSignIn={props.RtoLogIn} />:(
        //after register, '/register' presents login page with logout logo if already login (needa login? if login) (login page without logout logo if no login yet)
        //then press register link -> still '/register' presenting login page with/without logo
        //then press login or home link go to real login/home page; then press register link to re-register (real register page) but with/without logout logo
    return (  //ok
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
                <p>Or already have an account, go back <Link to="/login">Log In</Link> Now! </p>
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






