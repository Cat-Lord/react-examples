import '../App.css'
import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       hasError: false,
       message: ''
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true, error: error})
  }

  render() {
    // this error will also pop up in the console when in development mode
    if (this.state.hasError)
      return (
        <div className='error-div'>
          React wasn't able to render this type of element !<hr />
          <small>Reason: {this.state.error.message}</small>
        </div>
      );

    return this.props.children;
  }
}
