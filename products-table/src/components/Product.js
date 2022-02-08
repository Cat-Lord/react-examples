export default function Product(props) {
    let product;

    if (props.item.stocked === false)
        product = <tr><td className="item item-not-stocked"> { props.item.name } </td><td className="item" > {props.item.price} </td></tr>
    else
        product = <tr><td className="item" > { props.item.name } </td><td className="item" >{ props.item.price }</td></tr>

    return product;
}