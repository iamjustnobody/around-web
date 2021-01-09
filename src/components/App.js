//import logo from '../assets/images/logo.svg';
//import '../styles/App.css';
import React,{Component} from 'react';
import {TopBar} from './TopBar';
import {Main} from './Main';

/*
function App() {
  return (
    <div className="App">
      <TopBar />
    </div>
  );
}
*/

class App extends Component{
    constructor(props) {
        super(props);
        this.state={isLoggedIn: false};
    }
    handleLoggedIn=()=>{
        this.setState({isLoggedIn: true});
    }
    handleLoggedOut=()=>{
        this.setState({isLoggedIn: false});
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
