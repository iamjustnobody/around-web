import  React from 'react';
import {Register} from "./Register";
import {test} from "./test"
import {Login} from "./Login";
import {Home} from "./Home";

export class Main extends React.Component{

    render(){
        let btn;
        if(this.props.isSignedIn){
            btn=<Home toSignOut={this.props.toLogOut}/>
        }
        else{
            btn=<Login toSignIn={this.props.toLogIn}/>
        }
        return (
            <div className="main">
                {btn}
            </div>
        );
    }
}