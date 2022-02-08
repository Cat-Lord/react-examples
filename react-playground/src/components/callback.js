import React from 'react';

// https://reactjs.org/docs/handling-events.html

// RECOMMENDED APPROACH
export default class Callback extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);     // bind 'this' to work inside the callback function
    }

    handleClick(event) {
        console.log('Handling click');
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click
            </button>
        )
    }
}

// NOT THE BEST PERFORMANCE-WISE
export default class CallbackPerformanceIssue extends React.Component {
    handleClick = () => {
        console.log('Handling click');
    }

    render() {
        return (
            <button onClick={() => this.handleClick()}>
                Click
            </button>
        )
    }
}

// * * EXPERIMENTAL SYNTAX FEATURE ! * *
export default class CallbackExperimentalSyntax extends React.Component {
    
    // experimental syntax
    handleClick = () => {
        console.log('Handling click');
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click
            </button>
        )
    }
}