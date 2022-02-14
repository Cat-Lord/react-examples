import React, { Component } from 'react'

// Only class can be error boundary
export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       hasErrors: false
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);

    this.setState({
      hasErrors: true
    })
  }

  /**
   *  This method handles update on error 
   */

  // // update state
  // getDerivedStateFromError() {
  //   // next render will handle this change
  //   return { hasErrors: true };
  // }

  render() {
    if (this.state.hasErrors)
      return <div className="error">Error</div>;    // render error message if needed
         
    return this.props.children;                     // normally render children
  }
}
