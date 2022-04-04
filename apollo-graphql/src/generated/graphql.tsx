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

export type Query = {
  __typename?: 'Query';
  sessions?: Maybe<Array<Maybe<Session>>>;
};

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

export type Speaker = {
  __typename?: 'Speaker';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type SessionBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionBasicQuery = { __typename?: 'Query', sessions?: Array<{ __typename?: 'Session', id: string, title?: string | null, description?: string | null, startsAt?: string | null, room?: string | null } | null> | null };

export type SessionFullQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionFullQuery = { __typename?: 'Query', sessions?: Array<{ __typename?: 'Session', id: string, title?: string | null, description?: string | null, startsAt?: string | null, room?: string | null, endsAt?: string | null, day?: string | null, format?: string | null, track?: string | null, level?: string | null, speakers?: Array<{ __typename?: 'Speaker', id: string, name: string } | null> | null } | null> | null };


export const SessionBasicDocument = gql`
    query SessionBasic {
  sessions {
    id
    title
    description
    startsAt
    room
  }
}
    `;

/**
 * __useSessionBasicQuery__
 *
 * To run a query within a React component, call `useSessionBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionBasicQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionBasicQuery(baseOptions?: Apollo.QueryHookOptions<SessionBasicQuery, SessionBasicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionBasicQuery, SessionBasicQueryVariables>(SessionBasicDocument, options);
      }
export function useSessionBasicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionBasicQuery, SessionBasicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionBasicQuery, SessionBasicQueryVariables>(SessionBasicDocument, options);
        }
export type SessionBasicQueryHookResult = ReturnType<typeof useSessionBasicQuery>;
export type SessionBasicLazyQueryHookResult = ReturnType<typeof useSessionBasicLazyQuery>;
export type SessionBasicQueryResult = Apollo.QueryResult<SessionBasicQuery, SessionBasicQueryVariables>;
export const SessionFullDocument = gql`
    query SessionFull {
  sessions {
    id
    title
    description
    startsAt
    room
    endsAt
    day
    format
    track
    level
    speakers {
      id
      name
    }
  }
}
    `;

/**
 * __useSessionFullQuery__
 *
 * To run a query within a React component, call `useSessionFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionFullQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionFullQuery(baseOptions?: Apollo.QueryHookOptions<SessionFullQuery, SessionFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionFullQuery, SessionFullQueryVariables>(SessionFullDocument, options);
      }
export function useSessionFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionFullQuery, SessionFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionFullQuery, SessionFullQueryVariables>(SessionFullDocument, options);
        }
export type SessionFullQueryHookResult = ReturnType<typeof useSessionFullQuery>;
export type SessionFullLazyQueryHookResult = ReturnType<typeof useSessionFullLazyQuery>;
export type SessionFullQueryResult = Apollo.QueryResult<SessionFullQuery, SessionFullQueryVariables>;