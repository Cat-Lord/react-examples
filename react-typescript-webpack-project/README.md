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
  ```
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


- production readiness
  - install webpack-merge: npm i webpack-merge
  - create webpack configurations with separate development and production properties
  - use webpack-merge to ensure the correct environment in each of the modes (dev or prod)
  - this step changes our webpack configuration quite a bit, so we create a webpack directory to keep our project clean
  - and finally create/adjust `package.json` scripts to include dev and prod environments as variables

```
  ...
  
  "scripts": {
    "start": "webpack serve --config webpack/webpack.config.js --env environment=dev",
    "build": "webpack serve --config webpack/webpack.config.js --env environment=prod"
  },

  ...
  ```