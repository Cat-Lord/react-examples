# Wont-do
This project was based on webpack version 4. Newer version (which came out the same year) introduced breaking changes in the API. One of the changes is not including polyfills by default. The motivation is that one should not import backend modules to a frontend application. This breaks our application (I always use newest versions possible) and makes it unnecessarily difficult to focus on the core of the project.

The main takeaways are described here, but take it with care. Positives:
- I learnt to configure webpack a little behind the basics
- I created a base project when working on this project
- I tried and learned many other things related to project setup

# Installation and start
Our first step is to clone my own [react typescript repository](https://github.com/Cat-Lord/react-examples/tree/master/react-typescript-webpack-project). Then make sure to build the solution and verify installation:

1. npm install
2. npm start

# Server side rendering with React
This project follows a tutorial on Pluralsight called `Server Rendering React Components`. It will rebuild our base application to also use express server (see below).

Technical dependencies with newest version (might require some tweaking with breaking changes):
- React
- ExpressJS
- Babel
- Webpack
- Typescript (not in tutorial)

## Process:
1. Install every dependency via npm. We would need to pass in --save to store our dependencies locally, but it's no longer required and available by default in `npm install`. We can even shorten the installation syntax by writing `npm i ...`.
	- npm init -y (initial package.json file with dependencies)
	- npm install ... (installing every dependency - if error occurs, nothing will get installed at all)
See `package.json` for list of dev and non-dev dependencies.

- React and React-DOM are for react
- express will spin up a server instance,
- babel-loader is responsible to load modules for a webpack development. 
- Babel core is (exceptionally) required as a dependency, although it is a baseline for many babel-related packages and thus usually not required as a specific dependency. 
- Babel-node is a node 'wrapper' which starts a node server but first transpiles our code using babel [^1].

[^1]: Transpiling code is just simply restructuring (rewriting and adjusting) the code to fulfill specific needs. Babel transpiles code to ensure that for example new javascript features are supported in older browser. One good comparison is that compilation translates code to bytes and transpilation translates code to code.

We are now ready to run a custom nodejs server by adding a new script into the 'scripts' in package.json "start": "node server/index.js".

2. After that we will configure babel with the _.babelrc_ config file by adding presets and installing them. Now we change the start script to run babel-node which will include the babel preprocessing within the server start with script `"start": "babel-node server/index.js"`.If we now start the server, we should see the same output as before.


## Server side of the application
With react we need to ensure following properties of our application to stay server-side rendered.

1. State and methods comes **only from external props**.
2. NO async or ajax methods allowed.
3. Pure functions working with HTML.

All server-rendered components must work on client, it should run just like without server rendering.

## Configuration
The configuration of this project mostly followed the tutorial but I needed to find a way of configuring the typescript part of this project. I found [this starter repo](https://github.com/Microsoft/TypeScript-Babel-Starter) which has information about basic configuration and links to more focused examples (one of which is mentioned later in this file when setting up webpack).

### Setting up Babel
Babel can convert different types of source code into (usually) Javascript. We need to set it up in order to work with React - our goal is to convert React code into some Javascript (es6, es5, whatever we need).
	{
		"presets": [
			"@babel/preset-env",
			"@babel/preset-react",
    	"@babel/preset-typescript"
		]
	}

### Setting up webpack
Now we need to configure webpack to use babel and to be able to build our solution into a bundle. For that we create `webpack.config.js` and there we just configure webpack to use babel and point it to the 'main' file on our client that is holding the React.renderDOM (for now it is the `client.tsx` file).

After that we add a build script to our `package.json`. I found some good information in [this repo](https://github.com/a-tarasyuk/react-webpack-typescript-babel), which provides with example configuration for a project with react, typescript, babel and webpack. I followed it by adjusting my webpack config file. I also added a `tsconfig.json` (because I forgot previously).

[For some reason](https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined) we also need to set the runtime option in the webpack config file. This is how the end module looks like:

	module: {
    rules: [{ 
        test: /\.(ts|js)x?$/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", {"runtime": "automatic"}],
              "@babel/preset-typescript"
            ]
          }
        },
        exclude: /node_modules/ 
      }
		]
  }	

With the `HtmlWebpackPlugin` we must not focus on the HTML generated file. By default it would be generated for us with all the necessary tags (body + head, script tag to our bundle and other). We can (and in this case must) specify the HTML template so that our program can use the HTML and expect it to have all the necessities (like body with ID 'root').
Running only the webpack build command we get folder structure and HTML page like this:

`$ npm start # webpack --config webpack/webpack.config.js --env environment=dev`
```
src/public/build/
├── e2d5e8b2b63975fd6c87.jpg
├── index.html
├── main.js
├── main.js.map
├── vendors-node_modules_pmmmwh_react-refresh-webpack-plugin_lib_runtime_RefreshUtils_js-node_mod-555ad3.js
└── vendors-node_modules_pmmmwh_react-refresh-webpack-plugin_lib_runtime_RefreshUtils_js-node_mod-555ad3.js.map
```

Generated HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React with Typescript</title>
<script defer src="vendors-node_modules_pmmmwh_react-refresh-webpack-plugin_lib_runtime_RefreshUtils_js-node_mod-555ad3.js"></script><script defer src="main.js"></script></head>
<body>
  <div id="root">
    {{react-content}}
  </div>
</body>
</html>
```

**Note** that using the webpack-dev-server (script starting `webpack serve ...`, previously `webpack-dev-server ...`) causes the generated files to be only kept in memory and not stored. Our build folder would thus never be available for us in our project structure but the program will run correctly[^2].

[^2]: Assuming there are no errors in code or configuration 😉

### Creating React base component
Now we need to create the base component (or components if we desire so) and place it inside a HTML page. The first step is to create the placeholder page - basic HTML with a div with a specific ID. This id will be targeted in our base react component.

```html
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
```

Now we create an `<App />` component, where we (using React DOM) reference our container and place our app there.

```jsx
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
		document.querySelector("#container")    // place it inside the container in the index.html
	);
```

### Applying server rendering
So far we implemented and tested the webpack and babel together with typescript. Now we need to ensure that react renders server-side. To achieve that we use `renderToString()` function from react-dom server and we use it inside the index.js file.
