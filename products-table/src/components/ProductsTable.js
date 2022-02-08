import React, { Component } from 'react';
import ProductCategory from './ProductCategory'
import Product from './Product'

export default class ProductsTable extends Component {

  render() {
    let map = {};

    map = this.props.items.reduce((associativeMap, item) => {
      if (associativeMap[item.category] === undefined)
        associativeMap[item.category] = []

      associativeMap[item.category].push(<Product key={item.name} item={item} />);
      return associativeMap;
    }, {}); 
    
    const table = Object.entries(map).map(
      ([category, products]) => {
        return (

          // To avoid "Warning: Each child in a list should have a unique "key" prop" 
          // we need to add key TO THE FRAGMENT itself.
          <React.Fragment key={category}>
            <ProductCategory category={category} />
            { products }
          </React.Fragment>
        );
      });

    return (
        <table>
          <tbody>
            { 
              table
            }
          </tbody>
        </table>
    );
  }
}
