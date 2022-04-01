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
HOF are similar, but they don't work on classes. We can implement a workaround but it's not sustainable and prone to errors or misunderstandings. Decorators are simple, clean and work inside classes. This might also be their limitation, because they have practically no use outside of classes. Therefore is up to the programmer to picj 