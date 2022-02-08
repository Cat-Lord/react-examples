import React, { Component } from 'react';
import 'stylesheets/form.css'


export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            status: '',
            options: props.options
        };
        this.handleChage = this.handleChage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChage(event) {
        console.log("Setting up: " + event.target.type + " with value " + event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let message = "";
        Object.keys(this.state).forEach(key => {
            if (key !== "status"  &&  key !== "options") {
                console.log("Key: " + key + " => " + this.state[key]);
                message += " " + this.state[key];
            }
        });
        this.setState({status: message});
    }
    
    render() {
        return (
            <form className="extended-form" onSubmit={this.handleSubmit}>
                <h1>Status: {this.state.status}</h1>
                <ul>
                    <li>
                        <select name="some-option" value={this.state.status} onChange={this.handleChage}>
                            {this.state.options.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </li>
               
                    <li>
                        <label>
                            Input: 
                            <input name="some-input" type="text" onSubmit={this.handleSubmit} onChange={this.handleChage}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Text:
                            <textarea name="some-text" type="text" onSubmit={this.handleSubmit} onChange={this.handleChage} />
                        </label>
                    </li>
                    <li>
                        <input name="submit-button" type="submit" value="Submit" />
                    </li>
                </ul>
            </form>
        );
    }
}
