# Testing React
React is a frontend library, therefore it is difficult to pinpoint specific areas to test in a React application. Most logic to be tested is usually in the backend which then only provides React with data. It is essential to decide on what is and what is not suitable for testing.

# Tools
There may be many tools that are available for us to use. We need to supply a testing framework. React provides [testing API](https://reactjs.org/docs/testing.html) which handles access to components - children, props, etc. We can see the mapping in the following figure.

![React Component Structure][1]

There are many tools like [Jest](https://jestjs.io/), [mocha](https://mochajs.org/), [ava](https://github.com/avajs/ava). We could also consider other tools like [Storybook](https://storybook.js.org/) which are not necessarily designed for testing but offer great flexibility and allow us to isolate components in such way we can inspect them (much like exploratory testing).

## StoryBook
Visual tool that helps us create a toolbox of our React components. It allows us to render components in isolation with different default values and attributes. We then access Storybook and manually verify the rendered components and intended interaction.

## Jest
Library that let's us execute test code - so called 'test runner'. It can rely on the document content and test for different aspects of it, like 'Does it contain certain text ?'.
Jest expects files to have an ending of `.test.js` (or other appropriate extensions like `ts` or `tsx` etc.).

Writing tests consists of multiple steps. We need to keep good testing principles:
- Tests should not contain implementation details. Changes in implementation shouldn't require tests changes.
- We should test as specifically as possible. If our test fails, we should know exactly why and we shouldn't search for possible reason [^1].
- Never test through UI if it's avoidable. Testing functionality without the need of a complex UI approach is always more beneficial and allows us to focus on the logic instead of the interaction AND logic.
- Never test the same thing more than once.

Jest offers multiple convenient functions to ensure validity of results. Common is the `describe` function, usually used to introduce test methods. Test methods are named `it` but can also be named `test` with the same exact signature and meaning. These functions offer a placeholder for as many tests as needed (keep in mind good test practices). Often we would use a function like [expect](https://jestjs.io/docs/expect) in order to evaluate an object. `expect` accepts a tested object as parameter and provides its evaluation. We can see sample usage in the following example:

```js
test('sample evaluation test', () => {
  expect(obj).toBe('ACAB - All Cats Are Beautiful');
  expect(container).toBeDefined();
  expect(resolution).toBeGreaterThanOrEqual(600);
});
```

# Writing tests
We can use different methods to write a test. Within React itself we have access to testing APIs. The basic API is `React Testing Library` which accesses components more like objects. Below we see a sample test. 

`React testing library` sample test:
```ts
import ErrorPage from "../../globalErrorHandling/ErrorPage";

describe('Error Page', () => {
  it('should display exact error message', () => {
    // define mock page with a test message
    const testErrorMessage = 'test error message';
    const errorPage = ErrorPage({
      errorMessage: testErrorMessage
    });

    expect(errorPage).toBeDefined();
    // access exact part of the HTML via children and props
    expect(errorPage?.props.children[0].props.children).toBe(testErrorMessage);
  })
})
```

Another option is React's `Test Renderer`. It resembles the component hierarchy with a little more of React's abstractions like components and `props` and a more realistic environment. Sample test:
```ts
it('to have correct default option selected on render', () => {
    act(() => {
      createRoot(container)
        .render(<Select options={options} />)
    });
    const select = container.querySelector('select');
    expect(select?.value).toBe(options[0]);
  });
```

Note that `Test Renderer` has some convenient functions that **wrap some of the logic we've seen** in previous example(s) and thus it's not always required to use the `act()` function.


[^1]: If our test checks whether user specified correct input OR the input has appropriate label, test failure wouldn't reveal the problem right away. On the other hand having test for input correctness will immediately reveal that the input is incorrect if the test failed.

[1]:../.markdown/react-component-data-structure.png

## Asynchronous Tests
Asynchronous tests are similar to synchronous with the exception that they must always return a promise. The caveat here is that if we forget to return the promise, **the test will always pass**. Therefore it is important to see our test fail, not only succeed.

If we don't want to return a promise, we need to make our test function `async` and `await` the promise. Jest provides a convenient function that doesn't required us to use the `then` chaining and we can use `expect()` evaluations nicely like this:

```ts
it('should perform async test', async () => {
  //                                 👇 notice the `resolves` keyword
  await expect(Promise.resolve(1+1)).resolves.toBe(2)
})
```

# Common Errors

## Error: 'MyComponent' refers to a value...
Using typescript in tests is possible and we only have to name our test files with typescript extension. Although we can use plain `.ts` files as in direct component tree access (see [Writing Tests](#writing-tests)). We have to be careful to change the file extension to `.tsx` in case we have to use JSX because we would get weird errors like this:

```jsx
  // ...
  .render(<SomePage message={testMessage} />
```
> Error: 'SomePage' refers to a value, but is being used as a type here. Did you mean 'typeof SomePage'? 🤔❓

## The current testing environment is not configured to support act(…)
Act is a function that allows us to simulate browser environment from test environment. We can use it like a [HOF](../Javascript-notes.md#higher-order-functions-hof)) and supply it with render function. BUT - for this to work we must adjust the environment. Using `create-react-app` we have this `setupTests.ts` file where we put all the test-related configuration. Here we need to specify that we are going to use `act()`. Since we're using Typescript we also have to define the type of a global configuration object `globalThis`:

```ts
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
```

As said in [the documentation](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment), this tells React that we are running in a test environment.


## Security Vulnerabilities in Test Renderer
Installing test renderer via `npm i --save-dev react-test-renderer` led to security vulnerabilities:

> 6 high severity vulnerabilities

I tried audit fix (`npm audit fix --force)` which broke the build even more, tried reinstalling dependencies but couldn't get rid of it. I will ignore it for now, since this is a sample project but it is nice to be aware. 
