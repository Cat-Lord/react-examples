import React, { Component } from 'react'

export default class ClickableNumber extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       counter: 0
    }

    this.increaaseCounter = this.increaaseCounter.bind(this);
  }

  /**
   * Remember: React doesn't catch errors in event handlers, because
   *           the content is already rendered when event handlers 
   *           throws its error. 
   *           Use try/catch in these methods.
   */
  increaaseCounter(e) {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  render() {
    if (this.state.counter >= 5)
      throw new Error('This is expected testing error');
    
    return (
      <h3 onClick={this.increaaseCounter}>{this.state.counter}</h3>
    )
  }
}
