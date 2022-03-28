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

```
type Cat {
  id: ID!
  born: String
  neutered: Boolean,
  kittens: [Cat]
}
```

Query then contains required and/or optional fields when using a type:

```
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

```
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

```
query { 
  viewer {
		issues (last: 1) {
      nodes {

        """ Field 'comments' has an argument conflict: {first:\"5\"} or {last:\"5\"}?
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

```
  firstComments: comments (first: 5) {
    ...
  }
```

## Fragments
Reusable units in GraphQL query (analogy to functions). Usage is through a triple-dot operator `...NameOfFragment`.

```
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

```
query {
  ...
}

{
  ...
}
```

To be more descriptive we can name our queries like this:

```
query UsersWithRepositories {

}
```

## Variables
Dynamic content is achieved via variables passed into query definitions. They follow similar definition as type fields.

```
query UserLockedRepositories($isLocked: Boolean) {
  ...
    repositories(first: 5, isLocked: $isLocked)
  ...
}
```

## Mutations
Mutations are sort of a special type of queries that assume side-effects when run. While queries run in parallel, mutations on the other hand run in sequence.

```
  """ Change the status of user to a new (not-null) status
  """ with the type defined defined in github API
  mutation changeUserStatus($input:ChangeUserStatusInput) {
    changeUserStatus(input: $input) {
      """ Change only these field we define here
      clientMutationId
      status{
        message
      }
    }
  }
```

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

```
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