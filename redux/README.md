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