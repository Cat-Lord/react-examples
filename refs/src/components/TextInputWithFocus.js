import React, { Component } from 'react'
import '../App.css'

export default class TextInputWithFocus extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       inputValue: 'x'
    }

    // create ref 'container' to hold a DOM element
    this.inputRef = React.createRef();
    this.nextRef = React.createRef();

    this.focus = this.focus.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
  }

  changeInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  // We can use refs on mount, but this ONLY works in class Components
  componentDidMount() {
    this.inputRef.current.focus();
  }

  // When the focus button is pressed, DOM element stored in 'inputRef'
  // will have its focus method called *without* needing to re-render !
  focus() {
    this.nextRef.current.focus();    // dont forget to use 'ref.curent.'...
  }

  render() {
    return (
      <div className="text-input-form">
        <h3>{this.state.inputValue}</h3>
        <input ref={this.inputRef} type="text" onChange={this.changeInputValue}/>
        <button onClick={this.focus}>Focus</button>

        <br />
        <h3>Pressing 'Focus' will focus this form using ref.</h3>
        <input ref={this.nextRef} type="text" onChange={this.changeInputValue}/>
      </div>
    )
  }
}
