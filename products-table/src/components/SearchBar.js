import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleOnlyInStockChange = this.handleOnlyInStockChange.bind(this);
  }
  
  handleChange(event) {
    this.props.handleSearchTextChange(event.target.value); 
  }

  handleOnlyInStockChange(event) {
    this.props.onInStockOnlyChange(event.target.value);
  }

  render() {
    return (
        <div>
            <input type="text" placeholder="Search" onChange={this.handleSearchTextChange} />
            <input type="checkbox" id="stocked-products" name="stocked-products" onChange={this.handleOnlyInStockChange}/>
            <label htmlFor="stocked-products">Only show products in stock</label>
        </div>
    );
  }
}
