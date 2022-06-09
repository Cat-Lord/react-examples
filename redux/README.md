# About
React with Redux. Used most of the configuration from [webpack sample project](../react-typescript-webpack-project/). Dependencies:

- React
- Typescript
- Webpack & Babel
- Redux

# Presentation Components vs Containers
React isn't restricted to render every component in a 'visual' way. Many components can serve a grouping purpose and they don't visibly emit HTML themselves. There are a few key differences between containers and such 'presentation' components:

Container (also called *stateful* or *controller view*):
- usually holds state and functionality
- no visual elements or attributes
- can use Redux' `connect` to work with state

Presentational components (also called *view*):
- (usually simple) visual elements
- contain markup, styling, ...
- receive data to depict and handlers via props
- no state, ideally standalone not-dependant on non-visual elements

Container components should be considered when we are passing props down but are not working with them throughout[^1].

[^1]: This is also a place to consider context.

# Redux
Redux works with only a single store - single source of truth. It stores immutable data and allows the user to handle this data using reducers and actions.

Immutability has these benefits:
- Performance: Determining change is easier, because we can compare two object **references** and not every value of both objects.
- History: We are able to store multiple versions of a single object on each change and therefore able to re-create previous states. Tools allow us to reproduce steps that led to the current state and review each change.


Disadvantage is that we have to enforce these rules within the project team. We need to ensure that we don't forget and accidentally manipulate the data but rather use a reducer to perform an action. There are also tools that warn about manipulating with immutable variable like `redux-immutable-state-invariant` (use only in development !). Lastly, we can enforce library usages that handle immutability for us and provide us with ways of (seemingly changing immutable data). Those are packages like `immer`, `immutableJS`, etc.

## Manipulating the Store
In this section we will see Redux fundamentals.

### Store
Single source of truth with immutable data. There is no access to the store itself (for good reasons). The functions available to us are:

- dispatch (use reducer to somehow "change" the data)
- subscribe
- getState
- replaceReducer (useful for updates for hot replacement)

### Action
Action is a simple object  that represents an intent. It has (almost) arbitrary structure - only required to contain a `type`. It is a good practice to implement action creators as function that handle the action initializations so we don't have to keep track of the defaults.

```js
// operation is a supplied callback
function taxAction(taxAmount) {
  return {
    type: "TAX",
    taxAmount: taxAmount
  }
}
```

### Reducers
For the manipulation of the store we need to use a reducer with an action. The reducer is a *pure* function that returns new state. Ensure that a reducer produces no side-effects and for the same input reducer always returns the same output. It is forbidden to:

- mutate arguments
- perform side effects
- call non-pure functions

Basic structure of a reducer can look like this:

```js
function someReducer(state, action) {
  // ...
  return newState;
}
```

Below we can see a sample implementation of the reducer. Notice that we first determine the type of action and then act accordingly by creating a new object:

```js
function someReducer(state, action) {
  switch(action.type) {
    case 'TAX':
      return { state.total * (1 + action.taxAmount) };   // ex. 5 * 1.4 (0.4 taxAmount)
    default:
      return state;
  }
}
```

This would be even easier in typescript, because we can overload functions and thus create multiple reducers with the same name that correspond to each action separately:

```ts
type Action = { type: string };
type SomeAction = { value: number } & Action;
type OtherAction = { param: string } & Action;

function reducer(state: any, action: SomeAction) {
  // handle SomeAction
}

function reducer(state: any, action: OtherAction) {
  // handle OtherAction
}
```

It is possible (and even recommended) that a reducer uses multiple other reducers to handle one action. This is called `reducer composition` - using multiple specific reducers for performing small pieces of updates where necessary.

## Connecting React Components to Redux
As described earlier, we will use containers to connect to the redux. In the figure below we can see how React and Redux work together:

<img alt="React-Redux interaction" src="../.markdown/react-redux.png" width='250px' />

Yellow-highlighted area corresponds to Redux' responsibilities - it keeps and manages the store and updates relevant components when the respective store content changes. **It is important to remember** that Redux isn't exclusive to React. It can be used by other frontend frameworks too. In order to work with Redux in React we need to use `react-redux` library.

After adding necessary dependencies, we can `connect` our component to Redux, but before that. let's look at the connect function and describe its parameters:

`connect(mapStateToProps, mapDispatchToProps)(MyComponent)`

### mapStateToProps
Parameter `mapStateToProps` describes what state we want to pass to our component. It questions on what part of the redux store do we want to expose on the component. It is a function that returns an object that will be mapped onto our props. We can also say that this function transforms the store onto a specific components. We must be careful though because every time that a state changes, the component re-renders. Therefore being as specific as possible is a must.

One more important consideration is that whenever the component changes, this `mapStateToProps` function is called. Memoization is in this case a useful technique for determining if we actually need to re-run this function, since it can contain complex computations. Memoization can be achieved with React itself (useMemo) or any suitable libraries like `reselect`.

```js
function mapStateToProps(state) {
  return {
    users: state.users    // this will be a prop on our component
  }
}
```

### mapDispatchToProps
The next parameter `mapDispatchToProps` specifies what actions we want to expose as props. It is similar to `mapStateToProps` but receives `dispatch` as parameter. There are multiple ways we can use this function:

1. `bindActionCreators()`: This Redux function uses the third approach from this list but performs it automatically. Only requirement is to pass set of actions we need to wrap.
```js
function mapDispatchToProps(dispatch) {
  return {

    // sample usage: props.actions.loadCourses()
    actions: bindActionCreators(actions, dispatch);
  }
}
```
2. Ignore it completely: The `mapDispatchToProps` is only an optional parameter. By default, component will receive a `dispatch` functions that still allows the component to call specific actions manually if needed. It's not really beneficial, since we enable the component (which will only be a *view component*) to use Redux which it shouldn't even know about.
3. Manually wrapping actions: Implementing the `mapDispatchToProps` and returning an object with function calls as 'state-grabbers' is a nice solution:
```js
function mapDispatchToProps(dispatch) {
  return {
    // accessible via props.loadCourses or props.createCourse
    loadCourses: () => { dispatch(loadCourses()); },
    createCourse: () => { dispatch(createCourse(course)); };
  }
}
```
4. Define `mapDispatchToProps` as object with keys of actions we need and Redux will manage the mapping behind the scenes.
```js
const mapDispatchToProps = {
  loadCourses,
  incrementCounter
}
```