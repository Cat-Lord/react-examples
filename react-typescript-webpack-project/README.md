# About
This is a from-scratch example to try and set up a react project with typescript and webpack. This should be a pre-requisite to server-side-rendering project, because I had trouble with the dependencies and configurations. I followed [a youtube tutorial](https://www.youtube.com/watch?v=Elpu7CIuqjY&list=PLC3y8-rFHvwiWPS2RO3BKotLRfgg_8WEo) which worked.

# Steps

1. Initial project setup
project folder with:
  - src/
  - build/
  - .gitignore
  - README.md

  Run:
    npm init --y      # confirm every prompt, we will update it if needed
    git init          # in case it is a standalone project not included in this examples library
  
  Add files to gitignore:
    build/
    node_modules/
    package-lock.json

2. Install dependencies

  npm i react react-dom                                                               # react setup
  npm i typescript @types/react @types/react-dom                                      # typescript setup
  npm i @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript    # babel setup
  npm i babel-loader                                                                  # transpile files using webpack with babel
  npm i webpack webpack-cli webpack-dev-server html-webpack-plugin                    # webpack setup

3. Create all the necessary config and entry files

Config files:
- `tsconfig.json`
- `.babelrc`
- `webpack.config.js`: It's not required for it to be a `.ts` file. Be careful with paths and typos.

Entry points:
- `index.html`
- `App.tsx`
- `index.tsx`

4. Create the run script
  
  ```json
  ...
  "scripts": {
    "start": "webpack serve --config webpack.config.js --open"
  },
  ...
  ```

5. Install additional packages and features

- css compatibility: 
  - npm i css-loader style-loader
  - next we need to instruct webpack to use loaders for css files

- images compatibility:
  - create `declarations.d.ts` where we declare available modules. No need to install any extra loaders, we have support for images out of the box, only add these loaders to the webpack config.


- production readiness[^1]
  - install webpack-merge: npm i webpack-merge
  - create webpack configurations with separate development and production properties
  - use webpack-merge to ensure the correct environment in each of the modes (dev or prod)
  - this step changes our webpack configuration quite a bit, so we create a webpack directory to keep our project clean
  - and finally create/adjust `package.json` scripts to include dev and prod environments as variables

```json
  ...
  
  "scripts": {
    "start": "webpack serve --config webpack/webpack.config.js --env environment=dev",
    "build": "webpack --config webpack/webpack.config.js --env environment=prod"
  },

  ...
  ```

  - production build will generate necessary files placed in the build/ directory. We can run it with `npx serve` from inside the build directory. I've edited the build command to immediately start the server after successfully building the solution.

### React "Fast refresh" (hot reload)
Install plugin via `npm i --save-dev @pmmmwh/react-refresh-webpack-plugin react-refresh` and set 

```js
  devServer: {
    ...
    hot: true,
  }
```
This is everything required for this setup, but we can explore our options in the [official github repository](https://github.com/pmmmwh/react-refresh-webpack-plugin) is needed.


[^1]: Running both the development and production builds and inspecting it using the browser tools we can see that the javascript bundle reads:<br>
`Transferred 296.06 KB (1.23 MB size)` 🤔<br>
Running in production mode yields:<br>
`Transferred 44 KB (132.63 KB size)` 😊<br>
Using webpack chunk optimization we get this final result:<br>
`Transferred 1.87 KB (2.76 KB size)` 🤯<br>

## Optional extra's
These few extras are good when working with a team or provide additional but not essential tools:
- ESlint: Analyzes code and searches for errors. Logical (infinite loop), syntactical, unused code, missing declarations, ...
- Prettier: Automatic code formatter based on configuration definition (for example semicolons required, single quotes over double quotes, target ECMA script version set to ES6, ...).
- copy-webpack-plugin: Used to copy static assets into the build folder.
- webpack-bundle-analyzer: Cool visual representation of disk space occupation of every package in project, useful when minimizing build for production

## End Notes
To make it easier and more flexible I've rewritten webpack config files to obtain environment like this:

`webpack.someConfig.js`:

```js
  module.exports = ( env ) => {
    
    return {
      ...
    }
  }
```

And when combining different builds:

`webpack.config.js`:

```js
  module.exports = ( env ) => {
    
    ...
    // pick the proper environment configuration and call
    //  it as function to obtain the configuration object.
    const configMode = require(`./webpack.${env.environment}.js`); 
    const currentConfig = configMode(env);
    
    ...

  }
```

The advantage of this approach is that we can a provide and use various environment variables and program arguments. I configured the webpack-bundle-analyzer to be only run when a `debug` option is specified as an environment variable.