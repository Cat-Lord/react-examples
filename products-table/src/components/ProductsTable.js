import React, { Component } from 'react';
import ProductCategory from './ProductCategory'
import Product from './Product'

export default class ProductsTable extends Component {  

  isItemEligible(item, filter, inStockOnly) {
    if (inStockOnly === false)
      return item.name.toLowerCase().includes(filter.toLowerCase())

    return item.name.includes(filter)  &&  item.stocked;
  }

  render() {
    let map = {};
    const filter = this.props.filter ? this.props.filter : "";
    const inStockOnly = this.props.inStockOnly ? this.props.inStockOnly : false;

    map = this.props.items.reduce((associativeMap, item) => {
      if (associativeMap[item.category] === undefined)
        associativeMap[item.category] = []

      if (this.isItemEligible(item, filter, inStockOnly))
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
