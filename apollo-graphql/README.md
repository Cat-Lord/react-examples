# GraphQL
GraphQL has its own query language which resembles JSON without commas (see structure below). It uses clients to provide its functionality. GraphQL clients have several features:
- HTTP requests and JSON parsing
- UI update after receiving response from the server
- Caching is opt-in (instead of default HTTP caching)
- Error and schema validation/optimization
- Local state management and local caching (only available for some clients)
- Pagination (again only in some clients)

GraphQL Clients:
- Apollo
- Relay (facebook & only for react)
  
## Fields and Types
Types define how queries should or must be structured. Data types are simple:
- Int (32-bit integer)
- Float (double-precision floating point value)
- String (utf-8)
- Boolean
- ID (unique identifier)
- Arrays

Fields are optional by default and appending them with '!' makes them required. Types are therefore structured like this:

```ts
type Cat {
  id: ID!
  born: String
  neutered: Boolean,
  kittens: [Cat]
}
```

Query then contains required and/or optional fields when using a type:

```graphql
{
  query {
    viewer {
      login
    }
  }
}
```

### Field directives
To be able to change the fields in a more reliable way we have a few directives available. This process is supplied with directives that resemble java annotations.

- @includes(if: Boolean!)     - include this field if the boolean value is true.
- @skip(if:Boolean!)          - exact opposite of include: if the value is true, skip it and **don't** include it. Good for field where is an access required.
- @deprecated(reason:String)  - 

It is possible to define our custom directives.

Usage example:

type {
  ...
  tracks: String @deprecated(reason: "Too many sessions don't fit into single track, use tag instead")
  ...
}

## Arguments
Useful for combining fetch operations in one query. Here we can see the `issues` and `comments` fields with argument `last` and its different values.

```graphql
query { 
  viewer {
		issues (last: 1) {
      nodes {
        comments (last: 3) {
          nodes {
            body
          }
        }
      }
    }
  }
}
```

## Alias
Renaming field results to different name which enables re-fetching it with different arguments. The following query wants to use the `comments` field with different arguments which results in an error. Notice that errors start with triple " symbol.

```graphql
query { 
  viewer {
		issues (last: 1) {
      nodes {

        """ Field 'comments' has an argument conflict: {first:\"5\"} or {last:\"5\"}? """
        comments (first: 5) {
          nodes {
            createdAt,
            body,
          }
        }
        comments (last: 5) {
          nodes {
            author {
              url
            }
          }
        }
      }
    }
  }
}
```

Aliasing a field is done by prepending it with alias and column symbol:

```graphql
  firstComments: comments (first: 5) {
    ...
  }
```

## Fragments
Reusable units in GraphQL query (analogy to functions). Usage is through a triple-dot operator `...NameOfFragment`.

```graphql
{
  viewer {
    repositories(first:3) {
			...Repos
    }
  }
}

fragment Repos on RepositoryConnection {
  nodes{
    owner {
      login
    }
    description
    createdAt
  }
}
```

## Operations
Queries don't have to have a name or can have only `query` name. These examples are valid and identical.

```graphql
query {
  ...
}

{
  ...
}
```

To be more descriptive we can name our queries like this:

```graphql
query UsersWithRepositories {

}
```

## Variables
Dynamic content is achieved via variables passed into query definitions. They follow similar definition as type fields.

```graphql
query UserLockedRepositories($isLocked: Boolean) {
  ...
    repositories(first: 5, isLocked: $isLocked)
  ...
}
```

## Mutations
Mutations are sort of a special type of queries that assume side-effects when run. While queries run in parallel, mutations on the other hand run in sequence.

```graphql
  """ Change the status of user to a new (not-null) status """
  """ with the type defined defined in github API """
  mutation changeUserStatus($input:ChangeUserStatusInput) {
    changeUserStatus(input: $input) {
      """ Change only these field we define here """
      clientMutationId
      status{
        message
      }
    }
  }
```

# GraphQL with Typescript
To use typescript effectively with our custom GraphQL types, we have to have a way of converting GraphQL schemas to typescript types and interfaces. To do this we can use GraphQL code-generator.

After installation i ran into a weird problem: Tutorial suggests that I run `npm run graphql-codegen init` but I have no such script in my `package.json` (which NPM also complains about). So therefore i ran `./node_modules/.bin/graphql-codegen init` and continued without issues.

After this I also installed a [typescript plugin for grahpql-apollo & react](https://www.graphql-code-generator.com/plugins/typescript-react-apollo). It will generate React hooks based on our configuration.

Now we can create files to hold our queries, mutations, fragments and so on. We name these files `file.grapqhl` (where 'file' is our own name, for example 'mutations') to get nice syntax highlighting. It's otherwise not necessary to call our file anything else.

Now we use GraphQL code generator to generate our file. It will take all our files inside the directory we specified when doing the previous `... graphql-codegen init` command and spit out typescript react components. I specified the generating command as `ts:gen`. I created sample queries for `sessions` with some attributes (labeled `SessionBasic`) and a query with all attributes (labeled `SessionFull`). We can take a look at a sample of these generated files:

```tsx
  ...

  export type Session = {
    __typename?: 'Session';
    day?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    endsAt?: Maybe<Scalars['String']>;
    format?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    level?: Maybe<Scalars['String']>;
    room?: Maybe<Scalars['String']>;
    speakers?: Maybe<Array<Maybe<Speaker>>>;
    startsAt?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    /** @deprecated Too many sessions don't fit into single track, use tag instead */
    track?: Maybe<Scalars['String']>;
  };
  ...

  export function useSessionBasicQuery(...) { ... }
  export function useSessionBasicLazyQuery(...) { ... }

  ...
  export function useSessionFullQuery(...) { ... }
  export function useSessionFullLazyQuery(...) { ... }
```

Above is a snippet of the generated file. Typescript types were generated as well as hooks for the particular queries. Adding more queries, mutations, etc., we would just re-run the generation to get up-to-date types.

Note that there is also information about our `@deprecated` field directive.

# GraphQL Server
GraphQL server receives the query and fetches the results which it handles back to the client. In this place the developer designs and implements GraphQL schema and API. Popular options are:

- Apollo Server
- Express GraphQL
- GraphQL Yoga

The server has different responsibilities:

## Schema resolving 
Resolver function is a function that resolves a variable for a certain type or field and return objects or primitives like numbers. They work on values, types or fields but also on other APIs, databases, caches or other sources.

## Networking
Queries transported to server over HTTPS.

## GraphQL execution engine
Engine responsible for execution which is:
- Parsing client query
- Validating schema
- Returning JSON response
- Executing resolvers for each field to return them to the client

## Batch resolving
Creating and handling multiple request and their results in a single batch.

# GraphQL Backend Architecture
GraphQL enables clients to fetch data via queries. These queries are parsed and executed on the GraphQL server. The communication between GraphQL server and a database (or multiple databases).
Popular solution is for example Prisma which supports SQL as well as NoSQL databases [^1].

[^1]: Note that Prisma is a persistance layer ORM technology.

# Apollo

## Apollo Server
On start we get the default apollo playground. This is in-browser IDE for Apollo. Here we can see the schema and run GraphQL queries. We even get autocomplete and documentation through the automatic process of introspection (informing the IDE about our schema and providing it with definitions).

We are not limited to this Apollo IDE client, we can use simple HTTP POST requests to obtain any information we need[^2]. For example specifying body like this:

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

we get a list of our Query and Session type and others.

[^2]: Using HTTP tools like Postman we have support for GraphQL query requests out of the box. We might need to [tweak our settings](https://www.contentful.com/blog/2021/01/14/GraphQL-via-HTTP-in-five-ways) or requests when using different tools.

## Implementing Resolvers
For our gql definitions we need to create and maintain a **resolver map** which maps types to fields and tells the type how to find the field.

# Data sources

-- TODO dopisat tuto cast
-- TODO 3: FilterById (implementovat a pokracovat)

==
-- 5:22 https://www.youtube.com/watch?v=I6ypD7qv3Z8
-- zopakovat si pripadne reset hesla