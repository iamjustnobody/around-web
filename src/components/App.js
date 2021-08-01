
//import '../styles/App.css';
import React,{Component} from 'react';
import {TopBar} from './TopBar';
import {Main} from './Main';
import {TOKEN_KEY} from "../constants";


class App extends Component{
    constructor(props) {
        super(props);
    //    this.state={isLoggedIn: false};
        this.state={isLoggedIn: localStorage.getItem(TOKEN_KEY)?true:false};
        //everytime reflesh localhost page
    }
    handleLoggedIn=(token)=>{
        this.setState({isLoggedIn: true});
        localStorage.setItem(TOKEN_KEY,token);
    }
    handleLoggedOut=()=>{
        this.setState({isLoggedIn: false});
        localStorage.removeItem(TOKEN_KEY); //CLEAN TOKENKEY AFTER LOGOUT
    }
    render() {
        let btnTB,btnMain;
        if(this.state.isLoggedIn) {
            btnTB=<TopBar isSignedIn={this.state.isLoggedIn} toLogOut={this.handleLoggedOut} />
            btnMain=<Main isSignedIn={this.state.isLoggedIn} toLogOut={this.handleLoggedOut} />
        }
        else{
            btnTB=<TopBar isSignedIn={this.state.isLoggedIn} toLogIn={this.handleLoggedIn} />
            btnMain=<Main isSignedIn={this.state.isLoggedIn} toLogIn={this.handleLoggedIn} />
        }
        return (
            <div className="App">
                {btnTB}
                {btnMain}
            </div>
        );
    }
}
export default App;
