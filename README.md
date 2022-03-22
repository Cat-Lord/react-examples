
### Examples Repository
This repository contains projects which are either an implementation of React tutorials or other projects based on react. Below are general descriptions of each project.
Within each directory there are also `package-lock.json` files which are supposed to be commited, but I opted not to because this is a demo repository and doesn't need to rely on exact dependencies, versions, etc.

Things to consider:
- unDraw: Library with free-to-download pictures
- Nivo: UI library for data graphical elements (graphs, charts, ...)
- Tailwind css: Similar to bootstrap, more complex but also more unique

#### tic-tac-toe
Example game taken from [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html). There are two important files:

- official\_index.js: Exact copy of the official code copied from the site
- index.js: My own code written as an attempt to implement this game as an exercise following the tutorial. Working a little differently than the original.

#### react-playground
Playground where I tested most of the React functionality available at [Hello World documentation](https://reactjs.org/docs/hello-world.html). Main concepts I took from 
this guide are roughly commented along the way.

#### products-table
This is a part of *react-playground* but extracted as separate project for cleaner implementation available at [Thinking in React](https://reactjs.org/docs/thinking-in-react.html). This 
one I tried to implement solely on my own (with the help of the instructions from the web site).

#### frontend-example
Playing around with axios and connecting to java spring server. I was also trying out <Suspense /> but I couldn't get it working. I tried simulating
server delay.

#### named-imports
Trying out named-imports and playing around with different techniques of importing components

#### react-hooks-with-typescript
In this project we take a look on how to create react project with typescript and implement a simple application which displays a carousel based on [React conference of 2018](https://github.com/ryanflorence/react-conf-2018). This carousel has built-in animated timer and play/pause, next and previous slide controls.

#### Fishing evidence
A full-fledged project using the (Java backend)[https://github.com/Cat-Lord/fishing-evidence]. I use 
different technologies and will see how well each one fits. See README of fishing-evidence for more
info.

#### react-typescript-webpack-project
**Ready-for-use** basic example using:
- react: Frontend UI tool.
- typescript: Type-safe javascript.
- babel: transpiler used to achieve backward compatibility.
- webpack: Packing project files into single javascript (and compatible) bundle. Provides customizable production/development configurations with a few cool tools.