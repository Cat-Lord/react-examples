// Displays login/logout buttons based on user being logged in or out
import React from 'react';
import Greeting from 'components/greeting';

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}


function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            loggedIn: props.loggedIn,
        }
    }

    handleLogin() {
        this.setState({
            loggedIn: true
        })
    }

    handleLogout() {
        this.setState({
            loggedIn: false
        })
    }

    render() {
        let actionButton;
        if (this.state.loggedIn)
            actionButton = <LogoutButton onClick={this.handleLogout} />
        else
            actionButton = <LoginButton onClick={this.handleLogin}  />
        
        return (
            <div className='login-controls'>
                <Greeting loggedIn={this.state.loggedIn} />
                { actionButton }
            </div>
        );
    }

}