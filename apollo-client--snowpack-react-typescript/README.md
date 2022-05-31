# About
This is a react-typescript project set up with snowpack. Let's try it out !

## Setup
1. `npx create-snowpack-app snowpack-react-typescript --template @snowpack/app-template-react-typescript`
2. Add apollo-client and graphql libraries `npm i @apollo/client graphql`

And that's about it ! Easy... not really.

### React versions
Recently there was a new React version (React 18) and I needed to use this version because some libraries declare it as a peer dependency[^1]. In addition, React-DOM types were not properly installed and I had to install them by hand multiple times. The best way was to enlist the version number: `npm i @types/react@18 @types/react-dom@18`.
Be sure you have the correct types versions installed. Try running:

We can't rely on the IDE to pick up everything correctly. I had to manually type the import and use `createRoot` like this:

```ts
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);   // notice the '!'
root.render(<App />);
```

Notice how we need to tell typescript that we are sure the root won't be null with the exclamation mark ('!') as described in [Updates to Client Rendering APIs](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis).

[^1]: Peer dependency are declared by additional libraries can be explained as "in my library I need you to use this specific dependency for me to work properly".

### Graphql codegen
Install via `npm i @graphql-codegen/typescript`, after that we run the initialization setup with `npx graphql-codegen init`.  We can always modify these settings in the generated config file (in this case `codegen.yml`) or create our own from scratch. It guides the code generation tool on how and where to generate files from our graphql.

Options were set as follows:
- ? What type of application are you building? 
  - Application built with React
- ? Where is your schema?: (path or url) 
  - http://localhost:8080/graphql
- ? Where are your operations and fragments?: 
  - src/graphql/**/*.graphql
- ? Pick plugins: 
  - Typescript (required by other typescript plugins)
  - TypeScript Operations (operations and fragments),
  - TypeScript React Apollo (typed components and HOCs)
- ? Where to write the output:
  - src/graphql/generated/graphql.tsx
- ? Do you want to generate an introspection file? 
  - No
- ? How to name the config file? 
  - codegen.yml
- ? What script in package.json should run the codegen? 
  - gen

Generated file could look like this:
```yml
overwrite: true
schema: "http://localhost:8080/graphql"
documents: "src/graphql/**/*.graphql"
generates:
  src/graphql/generated/graphql.tsx:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
```

A few notes regarding this setup. Location of schema should follow the server setup. In my current case I created a Java server which runs on `http://localhost:8080/`. GraphQL is configured by default to be served from path `/graphql` and in my case I even have the graphical interface on path `graphiql` (which we don't care about in our frontend).

Introspection file is the file that is being created and served in the backend. It contains all GraphQL schema definitions. This is being send by the server when we connect to the graphql backend and our code can leverage this to create the typescript schema. It is not essential to have it stored in a file and I don't really need it to be stored, therefore I disabled it in the settings.

Generated file will be enriched by our own graphql definitions which we defined as `documents` in our configuration.

Naming the script `gen` is personal preference and enables us to generate typescript by running `npm run gen`. As simple as that.

After creating the configuration file we need to install codegen plugins via `npm install` and we can test our code generation with `npm run gen`. This gives us a generated file and outputs information like this:

```
> gen
> graphql-codegen --config codegen.yml

(node:69943) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
(node:69943) ExperimentalWarning: buffer.Blob is an experimental feature. This feature could change at any time
  ✔ Parse configuration
  ✔ Generate outputs
```

# UI Library
I checked for component libraries and found Material-UI. Unfortunately, MUI [doesn't work with Snowpack](https://github.com/mui/material-ui/issues/26568) for now and we have to leave it.

Next library I considered is Chakra-UI and works just fine. We just need to supply the `ChakraProvider` at the top of the component hierarchy to ensure proper propagation. Later we can use themes, global configurations and more.

# Formik
This app is expected to contain several forms and I wanted to try this library to see how it feels. From starters I was confused on how to use it properly and got stuck on some use cases. I will now describe usage and important points.

## Form is a render prop
Formik wraps forms in a `<Formik>` wrapper that supplies forms with some default values (like `onChange`, `onBlur`, etc.). These should be provided via render props, so our structure should look like this:

```jsx
<Formik>
{ 
  (values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting) => (

      <form onSubmit={handleSubmit}>
        { /* ... */ }
      </form>
  )
}
</Formik>
```

We can further use Formik's `Form` component to make this automatic:

```jsx
<Formik>
{ ({isSubmitting}) => (
    // no need to pass props
    <Form>
      <Field /* ... */>
      <Field /* ... */>
      
      {/* but we are still able to use props wherever needed */}
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  )
}
</Formik>
```

## Using Formik with UI libraries
Formik uses `Field` components to render and manage form data. We can create a field from available props using the `useField(props)` hook which will return props for Formik's `Field`. The field will be populated with defaults if necessary. Other than useful props we also get information like metadata (if the field was touched, if it has errors, etc.). But how can we now change the way it looks when we create it through Formik's interface ?

There is a prop for that as well. The prop is called `as` and we provide it with the component we wish to render the `Field` as. The process is simple and can look like this:

```jsx
import { Select } from '@chakra-ui/react' // example UI library

// ...
const [field] = useField(props);

return (
  // not using a library renders default HTML select
  <Field as='select' {...field} />
  
  // library-supported select
  <Field as={Select} {...field} />
)
```

We can see the difference in the following screenshot (left is before and right is after)

![Before and after applying `as`](../.markdown/field_as.png)

### Generalization
There could be one slight issue with this approach. If we have, let's say, a complex UI component that uses several required attributes, we cannot really supply it to the field (as seen above). Therefore the solution in this case is to create a custom component which will obtain required and supplied attributes.

```jsx
import { ComplexInput } from '@third-party/inputs';

// custom wrapper around <ComplexInput>
const CustomComplexComponent = (props) => {
  // create formik field attributes
  const [field] = useField(props.name);

  return (
    // use required props as expected and add the formik field attributes too
    <ComplexInput something={props.something} important={props.important} {...field} />
  );
}
```

## Related Forms
Sometimes we need to handle multiple forms as one big form. It is forbidden to embed forms[^2] therefore we need to implement a mechanism that would ensure communication on the level of related forms.

Let's revisit important Formik components:

- `Formik`: Usually top-level wrapper for forms. [Docs](https://formik.org/docs/api/formik).
- `Form`: [Wrapper](https://formik.org/docs/api/form) around HTML forms.

If we take a closer look we might discover that `Formik` acts as a manager and `Form` more like a template. And indeed, experimenting with it uncovers us some important pieces of knowledge - we cannot nest forms but we can handle multiple forms at once. We achieve this by enclosing multiple forms within one `Formik` wrapper !

Slight disadvantages of this are that we need to manage multiple logically separated entities together. Important point is that if **one form submits, all forms are submitted at once**. We can make use of HTML event handlers like `onClick` to prevent the submit if not necessary. Let's see an example:

```jsx
<Formik
  // initializing ALL forms at once
  initialValues={{ first: '', sec: '' }}

  onSubmit={(values: any, helpers: FormikHelpers<any>) => {
    // handling submit of all forms
    console.log('Submitting: ', values)
    helpers.resetForm()
  }}>
  {() => (
    <>
      <Form>
        <InputField name='first' type={'text'} aria-label='first' placeholder='' />
        {/* using this submit triggers Formik's onSubmit() function */}
        <Button type='submit' onClick={() => console.log('submit f')}>f</Button>
      </Form>

      <Form>
        <InputField name='sec' type={'text'} aria-label='sec' placeholder='' />
        
        {/* preventDefault let's us do validation, data handling and similar without the actual submit action */}
        <Button type='submit' onClick={(e: any) => { console.log('submit s'); e.preventDefault(); }}>s</Button>

      </Form>
    </>
  )}
</Formik >
```

Using the `preventDefault` function prevents the submission of all forms and we can do any required logic on submitted values using formik's  `useFormikContext()` [hook](https://formik.org/docs/api/useFormikContext).

[^2]: [W3 standard](https://www.w3.org/MarkUp/html3/forms.html) states 'There can be several forms in a single document, but the FORM element can't be nested'.

# Building for production

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.mjs` config file.

# Common issues
Graphql generated file gets imported with absolute path like this

`import { FishingGround, useAllFishingGroundQuery } from 'src/graphql/generated/graphql-gen'`. This causes issues 

because Snowpack throws an error that reads 

`Cannot find module 'src/graphql/generated/graphql' from '/home/catlord/react-workspace/apollo-client--snowpack-react-typescript'`.

Solving this is possible by supplying **relative** path to the graphQL file like this: 

`import { FishingGround, useAllFishingGroundQuery } from '../graphql/generated/graphql-gen';`.

[This can be adjusted](https://stackoverflow.com/questions/52432191/auto-import-in-visual-studio-code-only-offering-absolute-path-with-lerna-subpack) in VS Code settings: 

- File → Preferences → Settings → User Settings
- set `importModuleSpecifier` to `relative`