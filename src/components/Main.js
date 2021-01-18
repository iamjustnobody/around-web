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


    getStatus=(props)=>{ //console.log("halala"+this.props);//only having toLogIn func
        let btn;
        if(this.props.isSignedIn){
            btn=<Home toSignOut={this.props.toLogOut}/>
        } //btn=<Home {...props} toSignOut={this.props.toLogOut}/> //pass props to Home.js <CPB {...props}/> to CPB.js
        else{ //this.handleLogOut2LogIn();
            btn=<Login toSignIn={this.props.toLogIn}/>
            //btn=<Login {...props} toSignIn={this.props.toLogIn}/>   (& component={Home} in Route below: <Route path="/home" component={Home}/> //opt )
            // for testing transfer to register after succeed in login; push history to /register in login.js

        //    btn=<Login toSignIn={this.props.toLogIn} handleLogOut2LogInR={this.handleLogOut2LogInR}/>
            // handleLogOut2LogInR={this.handleLogOut2LogInR()}
        } //<Login {...props} or history={this.props.history}
        return btn;
    }
//<Route path="/login" component={Login}/>
// then can push history to other webpage (e.g. '/register')
    //but no toSIgnIn property as component={Login} is like render <Login />
    //path="/login" render={this.getStatus} so Login is nested inside Main or child of Main
    // but Register is not - because component={Register}
/*
    logOut2loginIfregistersuceed=(props)=>{
        return (<Register logout2loginM={this.state.logout2loginM} handleLogOut2LogIn={this.handleLogOut2LogIn}
                          RtoLogIn={this.props.toLogIn} handleLogOut2LogInR={this.handleLogOut2LogInR} />);
    } //btn=<Login toSignIn={this.props.toLogIn} handleLogOut2LogInR={this.handleLogOut2LogInR}/>
    //<Route path="/register" render={this.logOut2loginIfregistersuceed}/>
    // //   return props.logout2loginM?<Login toSignIn={props.RtoLogIn} handleLogOut2LogInR={props.handleLogOut2LogInR}/>: in register.js
    */

 /*
    logOut2loginIfregistersuceed=(props)=>{
    //    this.handleLogOut2LogInR();
        return (<Register RtoSignOut={this.props.toLogOut}  //for clear login when register (if there's login user)
                          logout2loginM={this.state.logout2loginM} handleLogOut2LogIn={this.handleLogOut2LogIn} //for render <Login> or redir to login in register.js
                          RtoLogIn={this.props.toLogIn} handleLogOut2LogInR={this.handleLogOut2LogInR} />); //previously props passed to login.js from main.js now register->login
                          //and reverse logout2loginM using handleLogOut2LogInR in login.js when register succed & redir to login or <login/>,
                          //so that after presenting <login> or '/login', it still can goback to register form page to register
    }//{...props}
    // <Route path="/register" render={this.logOut2loginIfregistersuceed}/>
    //props.logout2loginM?<Login toSignIn={props.RtoLogIn} handleLogOut2LogInR={props.handleLogOut2LogInR}/> in register.js
    */

    renderLogin=(props)=>{
        return (<Register RtoLogIn={this.props.toLogIn} />);
    }
    //<Route path="/register" render={this.renderLogin}/> //logout2login?<Login toSignIn={props.RtoLogIn} /> in register.js
    //btn=<Login toSignIn={this.props.toLogIn}/>

    //<Redirect /> in register. js can use both render {func} or component in <Route />

/*
    clearLoginWhenRegisterSucceed=(props)=>{ //console.log("haha"+this.props);//toLogOut func undefined
        return (<Register RtoSignOut={this.props.toLogOut} />);
    } //{...props} used when push history; no need when <redirect /
    //<Route path="/register" render={this.clearLoginWhenRegisterSucceed}/>
    */
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