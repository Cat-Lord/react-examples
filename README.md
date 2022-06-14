# Examples Repository
This repository contains projects which are either an implementation of React tutorials or other projects based on react. Below are general descriptions of each project.
Within each directory there are also `package-lock.json` files which are supposed to be committed, but I opted not to because this is a demo repository and doesn't need to rely on exact dependencies, versions, etc.

Things to consider:
- unDraw: Library with free-to-download pictures
- Nivo: UI library for data graphical elements (graphs, charts, ...)
- Tailwind css: Similar to bootstrap, more complex but also more unique

## tic-tac-toe
Example game taken from [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html). There are two important files:

- official\_index.js: Exact copy of the official code copied from the site
- index.js: My own code written as an attempt to implement this game as an exercise following the tutorial. Working a little differently than the original.

## products-table
This is a part of *react-playground* but extracted as separate project for cleaner implementation available at [Thinking in React](https://reactjs.org/docs/thinking-in-react.html). This one I tried to implement solely on
my own (with the help of the instructions from the web site).

## context
Small sample with react's [context](https://reactjs.org/docs/context.html). Not fully functional.

## error-handling
Playing around with react's [error handling mechanism](https://reactjs.org/docs/error-boundaries.html) with counters throwing errors and error boundaries catching them.

## jsx-in-depth
React's JSX bent over from multiple different sites. Experimenting with error-boundaries, conditional rendering and more.

## frontend-example
Playing around with axios and connecting to java spring server. I was also trying out <Suspense /> but I couldn't get it working. I tried simulating server delay.

## named-imports
Trying out named-imports and playing around with different techniques of importing components.

## refs
Simple project using react's [refs](https://reactjs.org/docs/forwarding-refs.html) with the main goal to showcase usage with a moving focus from one field to another.

## react-hooks-with-typescript
In this project we take a look on how to create react project with typescript and implement a simple application which displays a carousel based on [React conference of 2018](https://github.com/ryanflorence/react-conf-2018). This carousel has built-in animated timer and play/pause, next and previous slide controls.

## react-typescript-webpack-project
**Ready-for-use** sample bare-bone project. Created from scratch and configured to be used as a starting template.

Using:
- react
- typescript
- babel: transpiler used to achieve backward compatibility.
- webpack: Packing project files into single javascript (and compatible) bundle. Provides customizable production/development configurations with a few cool tools.

## Router
This project demonstrates the use of react router with the use of typescript.

## server-side-rendering
Project which included loads of headaches because of incompatibility of the tutorial (even though it was from ~2020). Webpack stopped including browser polyfills which took a long time to discover and understand. This sample wasn't finished, but demonstrates a good introduction in the README.

## Apollo-GraphQL
Basic information about GraphQL in README with a demo using Apollo and GraphQL in code (I tested the GraphQL client in the [github explorer](https://docs.github.com/en/graphql/overview/explorer)).
Using:
- Apollo Server
- GraphQL
- Typescript
- No project template (everything done 'by hand')

## apollo-client--snowpack-react-typescript
Frontend application that connects to [Java backend](https://github.com/Cat-Lord/graphql-server) used for simple fishing-related data management using GraphQL. Used snowflake (bundler, which I wanted to try out for some time) and realized it is really simple using a snowflake create app (similar to react's create-react-app). 

Using:
- typescript
- react 18
- snowflake bundler
- apollo-client
- graphQL

# Playgrounds
For-fun samples, experimenting and finding solutions if necessary.

## react-playground
Playground where I tested most of the React functionality available at [Hello World documentation](https://reactjs.org/docs/hello-world.html). Main concepts I took from this guide are roughly commented along the way. It's mostly a mess
suitable for quick and rough implementation testing.

## typescript-playground
Project containing as little configuration as possible. Used for testing typescript related syntax, features and others. `tsconfig.json` has default configuration.

Using:
- nodemon: fast reload
- ts-node: nodejs server with typescript


## testing-react
`create-react-app` environment with sample components and their respective testing techniques. Some tests are purposely duplicated to showcase different methods of achieving similar functionality. See README for more details.

Using:
- React test tools
- Jest
- Typescript

## redux
As the title says - sample react project demonstrating redux usage in react. I was following a `React with Redux` tutorial on pluralsight and tried to implement some solutions on my own diverging from the original.

Used:
- based on my existing project `react-typescript-webpack-project` structure
  - React
  - Typescript
  - Webpack
  - Babel
- Redux