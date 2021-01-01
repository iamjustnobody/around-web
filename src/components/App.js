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
  render() {
    return (
        <div className="App">
          <TopBar />
          <Main />
        </div>
    );
  }
}
export default App;
