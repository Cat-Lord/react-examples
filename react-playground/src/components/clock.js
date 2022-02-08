import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props)
        const startingTime = props.startingTime ? props.startingTime : new Date();

        this.state = {
            currentTime: startingTime
        }
    }

    tick() {
        this.setState({
            currentTime: new Date()
        })
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
                <h3>Current Time 
                    <span>{this.state.currentTime.toLocaleTimeString()}</span>
                </h3>
        );
    }
}