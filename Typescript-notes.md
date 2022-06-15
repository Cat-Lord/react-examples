# Typescript notes
Typescript is compatible with JS. It is required to compile from TS code to JS code we can run in the browser (or what not) because TS has no native support in browser or node etc. (maybe using extensions, but that's a no-go).

A notable mention similar to typescript is [flow](https://flow.org/en/docs/getting-started/).

In order to customize the TS behaviour we need to create a _tsconfig.json_ file. In this file there are tons of options, but the most important are:

  - target: Target JS version (default is ES3 at the time of writing this)
  - watch: Run typescript compiler once and let it recompile automatically on every save
  - lib: Additional libraries

## Types
Using TS variable types in code is either implicit or explicit.
  
  `let num = 12;`

assigns the variable implicit 'number' type. Assigning for example string '124' would now result
in an error. We can opt out of the strong-typing by assigning the variable an 'any' type:

```ts
  let num: any = 12;
  num = 'this will work no problem';

  let anyVar; // this variable will ALSO get the 'any' type, since we didn't assign any value, neither a type
```

It is considered redundant to add a type to a variable with assigned value.

```ts
  const num: number = 23;   // this is just an overkill
  const num2 = 69;    // this is okay
```

Arrays can also have a specific type defined as array of that type:

```ts
  const arr: number[];
  arr.push(1);
  arr.push(6969);
  arr.push("meow");     // error !  
```

### Casting to different types
It is possible to cast to a different type using `as` or `<>` operator:

```ts
  const input1 = document.querySelector('input[type="text"]') as HTMLInputElement;
  const input2 = <HTMLInputElement> document.querySelector('input[type="text"]');

  // interface which pick only related parts of HTMLInputElement
  interface MyInterface = {
    ...
  }

  // re-cast a type when using it like this
  if ((input as MyInterface).value) {
    ...
  }
```

### Creating types from existing types
We are able to [create types out of existing types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) and their properties. Imagine a code-generative tool that creates 
types as complex members.

```ts
type Generated = {
  member: Array<{ __memberType?: 'Picture', width: number, height: number, resolution: number, format: { __typename?: 'PictureFormat', label: string, encoding: string, limit: number } }> | null, 
  // ... other properties
}
```

Imagine that we need to create component props that accept the `member` from the `Generated` type. How can we achieve it ? By simply referencing the property `member` just like we would accessing it as a javascript member.

```ts
type ComponentProps = {
  member: Generated['member']   // treats the `member` as proper and standalone type
}
```

On top of that if we made accidents using string as selector (as seen above with the `member` string), typescript would point out our mistake:

> Property 'memberr' does not exist on type 'Generated'.

## Functions
Annotating function is possible by specifying the arguments and return value

```ts
  function pow(a: number, b: number): string {
    return Math.pow(a, b).toString();
  }
```

Or for example function without return value:

```ts
  function printResult(result: string): void {
    console.log(result)
  }
```

There is a little cumbersome approach to defining destructured object types. Imagine the scenario, when we expect complex object but need only a few of its properties. We would need to write something like `get({prop1, prop2})`. Now to assign the types, we need to do this:

```ts
function get({ prop1, prop2 }: { prop1: string, prop2: number}) {
  // ...
}
```

To make our lives a little easier, it is possible to define the types separately for a cleaner implementation:

```ts
type GetProps = {
  prop1: string
  prop2: number
}

function get({ prop1, prop2 }: GetProps) {
  // ...
}
```

## Objects and custom types
We can create and assign custom types. Types can have any value.

```ts
  type FontWeight = "bold" | italic | 600;
  let font: FontWeight = "bold";
  font = 600;
  font = 'meow';    // error !
```

### Tuples

There are more complex custom types called Tuples. They represent array of different 
types.

  type MyList = [string, number, boolean]

Creating an empty variable will throw an error, the array needs to be initialized:

  const arr: MyList = [];     // error !

We can solve this either by initializing it (obviously) or by defining the items in the
array as optional. Optional can be also for example function arguments as well.

  type MyList = [string?, number?, boolean?]  // these types in the list are all optional, see below
  const myArr: MyList =  [];    // a-ok !

### Generics

Generics, used like in Java.

```ts
  class List<T> {
    constructor(public value: T) {
      // ...
    }
  }

  const stringList: List<string>;
  const numList = new List(69);    // generic is automatically assigned as 'number'
```

Notice, that the value in the constructor is *public*. This is TS specific and will result in an 
_value_ property assigned to the list as public member. Private members on the other hand are not
accessible outside of the class. Just like Java... again.

Just an icing on the cake: TS provides automatic documentation for such classes. 

### Objects

There is a more flexible way of defining the structure of an object. 
```ts
  interface Person {
    first: string;
    last: string;
  }
```

Any variable of type 'Person' must have first and last variables of type string. This type can be 
used anywhere else, for example return statement, function parameters, etc.
To be less restrictive, we can specify optional arguments of an interface:

```ts
  interface LessStrict {
    num: number;
    label: string;
    [key: string] : any;      // any additional property, functions, strings, booleans, etc.
  }
```

## Optionality
We can infer value and its argument existence using operators. In the definition we use:
- `?`: value can be null
- `!`: value will never be null
  
Example:

```ts
  type obj = {
    myVar: number;    // <- must be present, can be `undefined`
    can?: String;     // <- this property can be omitted, we can't take its presence for granted
  }
```

If we are dealing with an optional value and we know that is will always be defined even though it is annotated with `?`, we can use it with the `!`. See example:

```ts
  type obj = {
    title: String;
    date: Date;
    description?: String;
  }

  // we know that 'description' will always be created and available because of DataStore implementation
  const opt : obj = DataStore.get();

  obj.description.toLowerCase();    // ERROR - possibly null (even though we know it's not going to be)

  obj.description!.toLowerCase();   // OK - here we are telling that it is optional, but we know it IS NOT null
```

Exclamation mark has one special meaning - if used twice it ensures that the result is a boolean value. Result is false if the value is null, undefined or 0, otherwise true. It is a utility shortcut for a check similar to `if (value == null || value == undefined) return false; else return true;`.

```ts
  console.log(!"cat")   // --> false

  console.log(!!"cat")  // --> true

  console.log(!!null)   // --> false
```

### Optional Chaining
If we know a value is optional we often get into trouble of determining if it is available. Different mechanisms can be used but the principle can be seen in the following example:

```ts
  // notice that the middle name can be optional
  type Name = {
    first: String;
    middle?: String;
    last: String;
  }

  // notice that 'name' is optional
  type User = {
    id: String;
    name?: Name;
    birthDate: Date;

  }

  const user: User = DataSource.fetchUser();

  if (user === null  ||  user === undefined) {
    ... // return
  }

  if (user.name === null  ||  user.name === undefined) {
    ... // return
  }

  if (user.name.middle === null  ||  user.name.middle === undefined) {
    ... // return
  }

  // use the middle name finally !
  console.log(user.name.middle);
```

Typescript optional chaining allows us to simplify the logic so that we can evaluate errors about non-existent values to undefined by default:

```ts
  // using the types from previous example
  const user: User = DataSource.fetchUser();

  // evaluate to middle name or undefined if an error occurred !
  console.log(user?.name?.middle);

```

## Extending definitions
We can use the `&` operator to combine definitions together if we need to.

```ts
  type DefaultConfig = {
    url: String;
  }

  type Server = {
    // extend default config with a 'port' member of type number and optional hasTTL boolean
    extendedConfig: DefaultConfig & { port: number; hasSSL?: Boolean };
  }
```

# Using Typescript effectively with dependencies
When we use typescript we can often run into a need to separate arguments from third-party libraries into constant objects, function calls, etc., when we need a custom configuration. For example our dependency can provide us with types for a init function. We can look up the definition and somehow implement it, but it would be troublesome and error-prone.

> Below we see a usage, but **typescript would complain** that it is not suitable for the init function.

```js
  import { init } from "third-party-library";

  init(defaultSettings);

  const defaultSettings = {
    open: true,
    port: 6969,
    name: "meow-town",
  };
```

This is because port is of type `number` and not of specific type how the `init` method might require. We can 'hack' the solution by creating default setting as const:

```ts
  const defaultSettings = {
    open: true,
    port: 6969,
    name: "meow-town",
  } as const;
```

This would resolve the typescript error and variables like 'port' would be of type '6969' (type got more specific). This works, but adding a dummy variable which doesn't exist for the init method doesn't result in a error. This could be difficult to track and we would want to know implement the specific type for the init method. This is easily achieved like this:

```ts
  // import types for the third party libraries
  import ThirdPartyLibrary from 'third-party-library';

  const defaultSettings = {
    open: true,
    port: 6969,
    name: "meow-town",
  } as Parameters<typeof ThirdPartyLibrary.init>[0];  // be careful, Parameters returns an array of parameters ! 
```

This looks like a general and perfect approach, although we must be careful to implement correct parameter:

```ts
  import TPL from 'third-party-library';

  // accepts string, configuration object and number
  TPL.create(
    "sample-name",
    defaultConfig,
    1234
  );

  const defaultConfig = {
    ...
  } as Parameters<typeof TPL.create>[1];  // implement second argument, configuration !
```

When we need to determine the type that a function returns, we can use ReturnType utility:

```ts
  import TPL from 'third-party-library';
  
  type obj = {
    id: number,
    value: ReturnType<typeof TPL.init>    // here we determine the type of whatever the 'init' function returns
  };
```

### Reference
There are other handy utilities like `Parameters<>` for example `ConstructorParameters`, etc. We can find them here in the [typescript documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html);

#### VS Code Detail
When using Typescript in VS Code sometimes the auto-completion or other TS features can freeze. We solve this by restarting the TS Server. First we need to be in a `.js`, `.ts` or `.tsx` file and open the command palette. Now we must find and select the option `Restart TS server` and we are good to go.

For more serious problems we can also find and use `Developer: Reload Window`.