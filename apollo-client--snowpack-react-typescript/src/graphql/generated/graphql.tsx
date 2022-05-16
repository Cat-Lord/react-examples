import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Book = {
  __typename?: 'Book';
  authorID?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  pageCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  allAuthors?: Maybe<Array<Maybe<Author>>>;
  allBooks?: Maybe<Array<Maybe<Book>>>;
  authorById?: Maybe<Author>;
};


export type QueryAuthorByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type RandomQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomQuery = { __typename?: 'Query', allBooks?: Array<{ __typename?: 'Book', name?: string | null, pageCount?: number | null } | null> | null };


export const RandomDocument = gql`
    query Random {
  allBooks {
    name
    pageCount
  }
}
    `;

/**
 * __useRandomQuery__
 *
 * To run a query within a React component, call `useRandomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomQuery({
 *   variables: {
 *   },
 * });
 */
export function useRandomQuery(baseOptions?: Apollo.QueryHookOptions<RandomQuery, RandomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomQuery, RandomQueryVariables>(RandomDocument, options);
      }
export function useRandomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomQuery, RandomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomQuery, RandomQueryVariables>(RandomDocument, options);
        }
export type RandomQueryHookResult = ReturnType<typeof useRandomQuery>;
export type RandomLazyQueryHookResult = ReturnType<typeof useRandomLazyQuery>;
export type RandomQueryResult = Apollo.QueryResult<RandomQuery, RandomQueryVariables>;