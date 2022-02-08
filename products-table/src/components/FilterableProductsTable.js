import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ProductsTable from './ProductsTable';

const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

export default class FilterableProductsTable extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       searchText: '',
       inStockOnly: false
    }

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
  }

  onSearchTextChange(searchText) {
    this.setState({
      searchText: searchText
    })
  }

  onInStockOnlyChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }
  
  render() {
    return (
        <div>
            <h3>{this.state.searchText}</h3>
            <h4>{this.state.inStockOnly}</h4>
            <SearchBar onSearchTextChange={this.onSearchTextChange} onInStockOnlyChange={this.onInStockOnlyChange}/>
            <ProductsTable items={products} />
        </div>
    );
  }
}
