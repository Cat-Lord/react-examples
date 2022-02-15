/**
 * This file showcases that JSX tags ignore or collapse whitespace content in some cases.
 */


// these divs will be rendered equaly
export function IgnoredItems(props) {
  return (
    <>
      { props.children }
    </>
  );
}