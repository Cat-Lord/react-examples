# Typescript notes
Typescript is compatible with JS. It is required to compile from TS code to JS code we can run in the browser (or what not) because TS has no native support in browser or node etc. (maybe using extensions, but that's a no-go).

In order to customize the TS behaviour we need to create a _tsconfig.json_ file. In this file there are tons of options, but the most important are:

  - target: Target JS version (default is ES3 at the time of writing this)
  - watch: Run typescript compiler once and let it recompile automatically on every save
  - lib: Additional libraries

## Types
Using TS variable types in code is either implicit or explicit.
  let num = 12;
assigns the variable implicit 'number' type. Assigning for example string '124' would now result
in an error. We can opt out of the strong-typing by assigning the variable an 'any' type:
  let num:any = 12;
  num = 'this will work no problem';

  let anyVar; // this variable will ALSO get the 'any' type, since we didn't assign any value, neither a type

It is considered reduntant to add a type to a variable with assigned value.
  const num: number = 23;   // this is just an overkill
  const num2 = 69;    // this is okay

Arrays can also have a specific type defined as array of that type:
  const nums: number[];
  arr.push(1);
  arr.push(6969);
  arr.push("meow");     // error !  

## Functions
Annotating function is possible by specifying the arguments and return value

  function pow(a: number, b: number): string {
    return Math.pow(a, b).toString();
  }

Or for example function without return value:
  function printResult(result: string): void {
    console.log(result)
  }


## Objects and custom types
We can create and assign custom types. Types can have any value.
  type FontWeight = "bold" | italic | 600;
  let font: FontWeight = "bold";
  font = 600;
  font = 'meow';    // error !

### Tuples

There are more complex custom types called Tuples. They represent array of different 
types.

  type MyList = [string, number, boolean]

Creating an empty variable will throw an error, the array needs to be initialized:

  const arr: MyList = [];     // error !

We can solve this either by initializing it (obviously) or by defining the items in the
array as optional. Optional can be also for example function arguments as well.

  type MyList = [string?, number?, boolean?]  // these types in the list are all optional
  const myArr: MyList =  [];    // a-ok !

### Generics

Generics, used like in Java.

  class List<T> {
    constructor(public value: T) {
      // ...
    }
  }

  const stringList: List<string>;
  const numList = new List(69);    // generic is automatically assigned as 'number'

Notice, that the value in the constructor is *public*. This is TS specific and will result in an 
_value_ property assigned to the list as public member. Private members on the other hand are not
accessible outside of the class. Just like Java... again.

Just an icing on the cake: TS provides automatic documentation for such classes. 

### Objects

There is a more flexible way of defining the structure of an object. 
  interface Person {
    first: string;
    last: string;
  }

Any variable of type 'Person' must have first and last variables of type string. This type can be 
used anywhere else, for example return statement, function parameters, etc.
To be less restrictive, we can specify optional arguments of an interface:
  interface LessStrict {
    num: number;
    label: string;
    [key: string] : any;      // any additional property, functions, strings, booleans, etc.
  }
