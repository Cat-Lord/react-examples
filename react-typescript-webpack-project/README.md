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
  ...
  "scripts": {
    "start": "webpack serve --config webpack.config.js --open"
  },
  ...