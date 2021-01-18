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
import {API_ROOT, TOKEN_KEY} from "../constants";
import {Link, Redirect} from "react-router-dom";
import {Home} from "./Home";
import {Register} from "./Register";

export const Login = (props) => { //console.log(props.toSignIn);
    console.log(props);
  //  let bu=false;
    const [testbu, setTestBU] = React.useState(false);

 //   props.handleLogOut2LogInR();
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
              //  props.history.push("/home");
             //   props.history.push("/home",{ isSignedIn: true,});
              /*  props.history.push({
                    pathname: '/home',
                    state: { isSignedIn: true,}
                })*/
             //   return <Redirect to="/home" />;
              //  return <Home toSignOut={props.toLogOut}/ //not dealing w state either

            //    localStorage.setItem(TOKEN_KEY,response); props.history.push("/register");
                //login ok can direct to register page but never home page (already login & Bearer) as no change to top states
                // unless <Route /home component={Home} BUT homepage (already login w Bearer) without logo of logout (no change to state affecting topbar)
                //can go back to login
                //btn=<Login {...props} toSignIn={this.props.toLogIn}/> in main.js or below
                //test: main.js <Route path="/login" component={Login}/> <Route path="/login" render={this.getStatus}/>
               // const bu=<Redirect to="/register" />;
                //bu=true;
            //    setTestBU(true);  localStorage.setItem(TOKEN_KEY,response);

            //    props.handleLogOut2LogInR();
                props.toSignIn(response);  //response as Bearer //deals with app.js state, compared to aboves //changes to states also change topbar logo
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
// return bu?<Redirect to="/register" /> : (  //<form>  //cannot transfer
 //   return testbu?<Redirect to="/register" /> : (  //can transfer same as push history above:
        // change to <Route /home component={Home} shows homepage (already login w Bearer) without logo of logout ((no change to state affecting topbar)
        //can go back to login again
 //   return testbu?<Register /> : (
        // /login w register page cannot go back to login unless press register or home (no logout logo if already login)
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