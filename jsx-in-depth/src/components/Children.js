
// rendering array of elements
function ArrayComponent(props) {
  return [
    <p  key="0">These are elements returned as array</p>,
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>, 
  ];
}

// different way of exporting a named function component 
export const Children = (props) => {
  
  return (
    <div>
      You can mix children types (this is text):
      <ul>
        <li>and these</li>
        <li>are</li>
        <li>ul elements</li>
      </ul>

      <ArrayComponent />
    </div>
  )
}