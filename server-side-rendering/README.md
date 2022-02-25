# Server side rendering with React
This project follows a tutorial on Pluralsight called `Server Rendering React Components`. It will build up the application
'from scratch' without using create-react-app.

We'll be using:
- React newest version (although the tutorial suggests 16.12)
- ExpressJS
- Babel
- Webpack

## Process:
1. Install every dependency via npm. We would need to pass in --save to store our dependencies locally, but it's no longer required and available by default in `npm install`. We can even shorten the installation syntax by writting `npm i ...`.
	- npm init -y (initial package.json file with dependencies)
	- npm install ... (installing every dependency - if error occurs, nothing will get installed at all)

		- npm install react react-dom express
	 	- npm install babel-loader @babel/core @babel/node
		- npm install --save-dev webpack webpack-cli webpack-dev-server		# notice that we use save-dev, because this depencency is only a dev dependency - we don't need it for production

	- installing typescript is a bit lengthy, so...
		- npm i typescript
		- npm install @babel/preset-typescript --save-dev
		- npm install -D ts-loader 				# load typescript files with webpack

We are now ready to run a custom nodejs server by adding a new script into the 'scripts' in package.json "start": "node server/index.js".

2. After that we will configure babel with the _.babelrc_ config file
	- adding presets and installing them, again, using npm
		- npm install --save-dev @babel/preset-env @babel/preset-react

Now we change the start script to run babel-node which will include the babel preprocessing within the server start - "start": "babel-node server/index.js". We can check if it works by adjusting the index.js:

	// plain javascript
	// const express = require('express');

	// test es6 syntax within babel-node server	import express from 'express'


If we now start the server, we should see the same output as before.


## Server side of the application
With react we need to ensure following properties of our application to stay server-side rendered.

1. State and methods comes **only from external props**.
2. NO async or ajax methods allowed.
3. Pure functions working with HTML.

All server-rendered components must work on client, it should run just like without server rendering.

### Creating React base component
Now we need to create the base component (or components if we desire so) and place it inside a HTML page. The first step is to create the placeholding page - basic HTML with a div with a specific ID. This id will be targeted in our base react component.

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<div id="container">
			Welcome to our page.
		</div>
	</body>
	</html>

Now we create an `<App />` component, where we (using React DOM) reference our container and place our app there.

	import ReactDOM from 'react-dom';

	export function App() {
		return (
			<div>
				<h1>Cats are love !</h1>
			</div>
		);
	}

	ReactDOM.render(
		<App />,                                // application component, we can split it if needed
		document.querySelector("#container")    // place it inside the contaier in the index.html
	);