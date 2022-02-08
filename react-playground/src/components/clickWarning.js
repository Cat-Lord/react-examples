import React from "react";
import 'stylesheets/App.css';

function Warning(props) {
    if (props.clicks < 5)
        return null;
    return (
        <div className="warning">
            <h1>!</h1>
        </div>
    )
}

export default class Clicker extends React.Component {
    constructor(props) {
        super(props);

        this.increaseClickCount = this.increaseClickCount.bind(this);
        this.resetClickCount = this.resetClickCount.bind(this);
        
        this.state = {
            clickCount: 0
        }
    }

    increaseClickCount() {
        this.setState({
            clickCount: this.state.clickCount + 1
        })
    }

    resetClickCount() {
        this.setState({
            clickCount: 0
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.increaseClickCount}>I dare you</button>
                <button onClick={this.resetClickCount}>Reset</button>

                <Warning clicks={this.state.clickCount} />
            </div>

        );
    }
}