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

# Building for production

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.mjs` config file.
