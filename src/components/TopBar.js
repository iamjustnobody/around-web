import React,{Component} from 'react';
import logo from "../assets/images/logo.svg";
import {LogoutOutlined} from '@ant-design/icons';

export class TopBar extends Component { //React.Component
    render() {
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <a
                    className="App-title"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Around
                </a>
                {
                    this.props.isSignedIn?
                        <a onClick={this.props.toLogOut} className="LogoutIcon">
                            <LogoutOutlined /> Logout
                        </a>
                        :null
                }
            </header>
        );
    }
}