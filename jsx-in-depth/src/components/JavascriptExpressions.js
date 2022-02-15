import { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";

// we MUST define a component that will throw an error (expected in this case) 
// because otherwise the error would rise in the boundary and the boundary
// wouldn't be able to catch it
function ComponentWithError(props) {
  return <div> { props } </div>;
}

// using callback function as child of this function component.
function FunctionCallback(props) {
  const callback = props.children;
  return callback(props.length);
}

export class JSComponent extends Component {

  render() {
    const items = [];

    // we can't use reserved words like 'if' or 'for'
    // in the JSX, so we need to prepare it before
    if (this.props.items) {
      for (const item in this.props.items)
        items.push(<div key={ item.toString() } >item</div>);
    }

    return (
      <>
        { /* Be careful: If items was null or empty, there would still be output which would read '0' */}
        
        { items  &&  "⬇️ This is conditionally rendered text - there are items ! See them below ⬇️" }
        { items }
        Today's date is { new Date().toDateString() }.
        <hr />
        <small>Including string is also possible using {'javasript tags'}.</small>
        <p>
          Javascript expression normally evaluate to string, React Component or their combination.
          Let's calculate how old I am: I am { new Date().getFullYear() - 1996 } years old.
        </p>

        {/* we need to wrap this date in error boundary, because it is an object. This way we 
        demonstrate that JSX can also get objects that it cannot render and we have to deal with it. */}
        <ErrorBoundary>
          <ComponentWithError props={() => console.log("this should not happen !") } />
        </ErrorBoundary>

        {/* Children can also be callbacks, if the component knows how to handle them */}
        <FunctionCallback length={10}>
          {
            (len) => {
              const elements = [];
              let index = 1;
              while (index < len) 
                elements.push(<p key={index}>This function generated {index++}. element.</p>);

              return elements;
            }
        }
        </FunctionCallback>
      </>
    );
  }
}