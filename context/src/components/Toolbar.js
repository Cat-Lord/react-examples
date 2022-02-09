import React, { Component } from 'react';

export default class Toolbar extends Component {
  constructor(props) {
      super(props)
      this.changeTheme = this.changeTheme.bind(this);
  }
    
  changeTheme(event) {
    this.props.onThemeChane(event.target.checked);
  }

  render() {
    return (
        <span>
            <label htmlFor="theme">Light theme </label>
            <input name="theme" type="checkbox" onChange={this.changeTheme}/>
        </span>
    );
  }
}
