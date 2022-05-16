# Basics

## Nullish Coalescing
When we need to check for nullish values, we can write an if statement, or we can use the short-hand form:

```js
// from array 'arr' construct
// new array without null values
function skipNullValues(arr) {
  return arr.flatMap((value) => value ?? []);
}
```

In the example above we see that value is being returned but with the `??` operator, we say that `if the value is null, return whatever is after this operator`. The nullish value being checked on the left-hand side is `null` and `undefined`. We can supply suitable default for this kind of behaviour:

```js
function startServer(config) {
  const port = config.port ?? 8080;   // be careful - if config is null, this would crash !
  const protocol = config?.protocol ?? 'http';   // we can solve it using optional chaining operator `?`
  ...
}
```

In the above function observe that having `config.port` null we get default of `8080`. But if the config itself would be null, we would get an error. Nullish coalescing doesn't 'chain' for every attribute of our (left-side) expression, but we can use [optional chaining operator for it]("./../Typescript-notes.md#optionality). Expressions are short-circuited, so if a left-hand side expression is not null, right-hand side doesn't get evaluated:

```js
const val = A() ?? B();   // if A returns not-nullish value, B() IS NOT called.
```

## Class declaration vs Class expression
Class declaration: 
```js
class Meow {
  ...
}
```

Class expression:
```js
const cat = class Meow {
  ...
}
```

Difference: Classes created via the class expression are **only** accessed via the variable they get assigned to.

## Decorators
Decorators are a special kind of higher-order functions (HOF). 

### Higher-order functions (HOF)
HOF are simply functions receiving and calling or even returning other functions.

> Below we can see that logWithTime is a HOF calling logger and adding some extra information to it.

```js
function logWithTime(logger) {
  return function() {
    "Current time: " + new Date().toString() + " | " + logger()
  }
}
```

### Putting it together
Decorators are wrappers like HOF but also applied on other types than functions. We can decorate classes, members, functions and create our own custom decorators.

Decorator takes multiple arguments and uses them to determine the context of decorated value and appropriate action depending on the type of decorator. We can for example have a decorator like this:

```js
class Cat {
  constructor() { ... }

  @logged
  name;

  birthDate;

  @logged
  getDateOfBirth() { ... }
}
```

and our decorator can log the `name` variable just simply using its value and the `getDateOfBirth` can be logged with an information about when it was called. It always depends on the implementation of decorator used.

### Why decorators and not HOF ?
HOF are similar, but they don't work on classes. We can implement a workaround but it's not sustainable and prone to errors or misunderstandings. Decorators are simple, clean and work inside classes. This might also be their limitation, because they have practically no use outside of classes. Therefore is up to the programmer to pick the suitable approach.

## Automation tools

### Grunt
Works using configuration scripts. Expandable with plugins. Performs file IO after each task.

### Gulp
Improves Grunt's approach by using in-memory streams and pipes outputs from command to command. Is usually faster than Grunt and its configuration is code-based. There are also many plugins available.

### NPM scripts
Leverage the operating system's command line via `package.json` configuration. Offers convention-based pre/post hooks.

Using pre/post hooks is simple. Imagine I want to display a startup and final message in a script like this:

```json
...
"scripts": {
  "prestart": "echo Starting dev server",
  "start": "node dist/index.js",
  "poststart": "echo Execution finished"
}
...
```

## Bundlers
Minifies javascript code into smaller packs. Performs operations like tree shaking and enables us to deploy onto specific environments.

Historical options:
- RequireJS

Popular Options:
- Webpack: Robust and adaptable to intelligently handle images, CSS, and more (for i.e. imports), serves files from memory
- Snowpack: Super-fast startup and reload, extensively uses caching, builtin support for modern frameworks with plugin ecosystem and focused on front-end (Todo: I want to try this 😊)
- Rollup: Good with tree-shaking and thus enables fast loading speed and much more reduced bundle size. Is better for library development rather than application.
- Browserify: First big bundler, simple & plugin based, uses CommonJS
- Parcel: 0-config bundler with predefined defaults and is similar to webpack (in functionality) whilst retaining speed.

## Linters
Enforcing coding style. Things such as: using curly braces, trailing commas, global variables, ...

- JSLint: Extremely opinionated
- JSHint: Improvement of JSLint with some configurations
- ESLint: Technically the best and standard option 🥰

### ESLint

- EsLint: Config Format can be either dedicated file or inside of npm's `package.json`:
```json
  ...
  
  "eslintConfig": {
    "plugins": [],
    "env": {
      ...
    }
  }
  
  ...
```

- Rules: These allow us to specify what will be considered error. We can enable or disable rules to find a fitting configuration. With rules enabled, next decision is to determine, whether the rule produces warning or straight up error.

- Plugins: There is number of plugins for different frameworks so that ESLint is able to keep up with their twerks and perks.

- Presets: Presets introduce ESLint pre-defined configuration. This is recommended and adjustable. It is also possible to use existing configuration from popular technological platforms. Be careful: They are not always configurable.

ESLint doesn't watch files by default. There are options on how to solve this problem, for example when using bundler like Webpack, we can include `eslint-loader`. This will ensure that 