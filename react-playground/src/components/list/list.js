import React, { Component } from 'react';

export default class List extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         numbers: (props.numbers ? props.numbers : [])
      }
    }
    
  render() {
    return <div>
        <ul>
            {this.state.numbers.map((num) => <li key={num.toString()}>{num}</li>)}
        </ul>
    </div>;
  }
}

