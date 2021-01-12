import React from 'react'
/*
export class Login extends React.Component{
    render(){
        return (
            <div>
                <p>login</p>
                <button onClick={this.props.toSignIn}>log in</button>
            </div>
        );
    }
}
*/

import {Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {API_ROOT} from "../constants";
import {Link, Redirect} from "react-router-dom";
import {Home} from "./Home";

export const Login = (props) => { //console.log(props.toSignIn);
    const onFinish = (values) => {
        try{
            console.log('Received values of form: ', values);
            //fire api call
            fetch(`${API_ROOT}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
            }).then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error(response.statusText);
            }).then((response) => {
                message.success('Login Succeed');
                console.log(response);  //Bearer
            //    props.toSignIn();
            //    props.history.push("/home");
             //   return <Redirect to="/home" />;
              //  return <Home toSignOut={props.toLogOut}/
                props.toSignIn(response);  //response as Bearer
                //LOCALSTORAGE
            }).catch((e) => {
                message.error('Login Failed');
                console.log(e);
            });

        }catch(err){
            alert(err);
            console.log(err);
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            /*
            initialValues={{
                remember: true,
            }}
             */
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" >
                    Log in
                </Button>
                Or <Link to="/register">Register Now!</Link>
            </Form.Item>
        </Form>
    );
};