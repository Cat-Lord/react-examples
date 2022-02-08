import React, { Component } from 'react';

export default class Sidebar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         color: props.color
      }
    }
    
  render() {
    return (
        <div className={'sidebar sidebar-' + this.state.color}>
            {this.props.children}
        </div>
    );
  }
}
