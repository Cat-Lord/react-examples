import React, { Component } from 'react';

function Messages(props) {
    return (
        <ul>
            <li>123</li>
            <li>345</li>
            <li>567</li>
            <li>789</li>
            <li>890</li>
        </ul>
    );
}

function Contacts(props) {
    return (
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
        </ul>
    );
}

function SplitPaneLayout(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}      
        </div>
        <div className="SplitPane-right">
          {props.right}      
        </div>
      </div>
    );
  }

/**
 * Using different splits of children within one component
 */
export default class SplitPanel extends Component {
  render() {
    return (
        <SplitPaneLayout 
            left={<Contacts />}
            right={<Messages />}
        />
    );
  }
}
