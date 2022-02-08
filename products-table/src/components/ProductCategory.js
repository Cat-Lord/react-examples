export default function ProductCategory(props) {
    return (
        <tr>
            <td colSpan="2" className="category-data">{props.category}</td>
        </tr>
  );
}