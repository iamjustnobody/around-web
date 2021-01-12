import  React from 'react';
import {Register} from "./Register";
import {test} from "./test"
import {Login} from "./Login";
import {Home} from "./Home";
import {Link} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
//import {Switch} from "antd";

export class Main extends React.Component{
    getStatus=()=>{
        let btn;
        if(this.props.isSignedIn){
            btn=<Home toSignOut={this.props.toLogOut}/>
        }
        else{
            btn=<Login toSignIn={this.props.toLogIn}/>
        }
        return btn;
    }
    render(){
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getStatus}/>
                    <Route path="/login" render={this.getStatus}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getStatus}/>
                    <Route component={Login}/>
                </Switch>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/home">Home</Link>

            </div>
        );
    }
}