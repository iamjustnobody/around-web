import React from 'react'

export class Home extends React.Component{
    render(){
        return (
            <div>
                <p>home</p>
                <button onClick={this.props.toSignOut}>log out</button>
            </div>
        );
    }
}