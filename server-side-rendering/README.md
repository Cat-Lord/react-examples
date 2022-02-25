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
