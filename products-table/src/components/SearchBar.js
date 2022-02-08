import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
        <div>
            <input type="text" placeholder="Search" />
            <input type="checkbox" id="stocked-products" name="stocked-products" />
            <label htmlFor="stocked-products">Only show products in stock</label>
        </div>
    );
  }
}
