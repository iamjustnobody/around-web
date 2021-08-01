import  React from 'react';
import {Register} from "./Register";
import {test} from "./test"
import {Login} from "./Login";
import {Home} from "./Home";
import {Link} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
//import {Switch} from "antd";

export class Main extends React.Component{

    constructor(props) {
        super(props);
        this.state={logout2loginM:false};
    }
    handleLogOut2LogIn=()=>{
        this.setState({logout2loginM:true});
    }
    handleLogOut2LogInR=()=>{
        this.setState({logout2loginM:false});
    }


    getStatus=(props)=>{ 
        let btn;
        if(this.props.isSignedIn){
            btn=<Home toSignOut={this.props.toLogOut}/>
        } 
        else{ 
            btn=<Login toSignIn={this.props.toLogIn}/>
        } 
        return btn;
    }


    renderLogin=(props)=>{
        return (<Register RtoLogIn={this.props.toLogIn} />);
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
