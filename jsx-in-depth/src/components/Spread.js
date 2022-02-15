/* 
 Using spread we can forward or change multiple props. We can 
 change or remove arbitrary key-value pairs. So this:

  { some, ...restOfProps } = props

  would remove 'some' key from props and assign it to 'some' variable.
  The next example depicts it in detail:

  props = {
    a: 1, 
    b: 2,
    c: 3,
    d: 4
  }

  { d, ...other } = props;    // d === 4, other['d'] would result in an error

*/

// note: we actually print the value of 'children' here
function Date(props) {
  return <div {...props}></div>
}

export function Heading(props) {
  const { className, children, ...others } = props;        // extract 'className' and 'children' attribute from props
  return (
    <h1 className={className} >
      { children }
      <Date { ...others } />
    </h1>
  );
}