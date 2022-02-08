import React, { Component } from 'react';

function ListItem(props) {
    return (
        // NOT <li key=""> ... !
        <li>{props.data ? props.data : "No data"}</li>
    );
}

// It is important to know where to put the KEY attribute
//      in this example we are listing the "ListItem", therefore we
//      use the key on each <ListItem />, not the inner <li> element !
export default class Listing extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       items: props.items
    }
  }
  


  render() {
    let listItems = this.state.items.map(
        // key WONT be accessible from ListItem as prop
        (item) => <ListItem key={item.id} data={item.data} />

        // if we need the keys inside the ListItem, we could do it like this
        // (item) => <ListItem key={item.id} keyData={item.id} data={item.data} />
    );
    return (
        <ul>
            { listItems }
        </ul>
    );
  }
}
