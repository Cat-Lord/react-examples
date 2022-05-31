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

export type Fish = {
  __typename?: 'Fish';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type FishingGround = {
  __typename?: 'FishingGround';
  code: Scalars['String'];
  id: Scalars['ID'];
  label: Scalars['String'];
};

export type FishingGroundStatistics = {
  __typename?: 'FishingGroundStatistics';
  fishingGround?: Maybe<FishingGround>;
  totalAmount?: Maybe<Scalars['Int']>;
  totalNumberOfVisits?: Maybe<Scalars['Int']>;
  totalWeight?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttendance?: Maybe<Scalars['ID']>;
};


export type MutationAddAttendanceArgs = {
  catches?: InputMaybe<Array<NewCatch>>;
  fishingGroundID: Scalars['ID'];
  totalVisits: Scalars['Int'];
};

export type NewCatch = {
  fishID: Scalars['ID'];
  totalAmount: Scalars['Int'];
  totalWeight: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  allFish: Array<Fish>;
  allFishingGround: Array<FishingGround>;
  getAllFishingGroundsStatistics: Array<FishingGroundStatistics>;
  getFishById?: Maybe<Fish>;
  getSession?: Maybe<Session>;
};


export type QueryGetFishByIdArgs = {
  id: Scalars['ID'];
};

export type Session = {
  __typename?: 'Session';
  /** User login cookie */
  uid?: Maybe<Scalars['String']>;
};

export type AddAttendanceMutationVariables = Exact<{
  fishingGroundID: Scalars['ID'];
  totalVisits: Scalars['Int'];
  catches?: InputMaybe<Array<NewCatch> | NewCatch>;
}>;


export type AddAttendanceMutation = { __typename?: 'Mutation', addAttendance?: string | null };

export type GetFishByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetFishByIdQuery = { __typename?: 'Query', getFishById?: { __typename?: 'Fish', id: string, name: string } | null };

export type AllFishAndFishingGroundsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFishAndFishingGroundsQuery = { __typename?: 'Query', allFishingGround: Array<{ __typename?: 'FishingGround', id: string, code: string, label: string }>, allFish: Array<{ __typename?: 'Fish', id: string, name: string }> };

export type CheckConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckConnectionQuery = { __typename?: 'Query', getSession?: { __typename?: 'Session', uid?: string | null } | null };


export const AddAttendanceDocument = gql`
    mutation AddAttendance($fishingGroundID: ID!, $totalVisits: Int!, $catches: [NewCatch!]) {
  addAttendance(
    fishingGroundID: $fishingGroundID
    totalVisits: $totalVisits
    catches: $catches
  )
}
    `;
export type AddAttendanceMutationFn = Apollo.MutationFunction<AddAttendanceMutation, AddAttendanceMutationVariables>;

/**
 * __useAddAttendanceMutation__
 *
 * To run a mutation, you first call `useAddAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAttendanceMutation, { data, loading, error }] = useAddAttendanceMutation({
 *   variables: {
 *      fishingGroundID: // value for 'fishingGroundID'
 *      totalVisits: // value for 'totalVisits'
 *      catches: // value for 'catches'
 *   },
 * });
 */
export function useAddAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<AddAttendanceMutation, AddAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAttendanceMutation, AddAttendanceMutationVariables>(AddAttendanceDocument, options);
      }
export type AddAttendanceMutationHookResult = ReturnType<typeof useAddAttendanceMutation>;
export type AddAttendanceMutationResult = Apollo.MutationResult<AddAttendanceMutation>;
export type AddAttendanceMutationOptions = Apollo.BaseMutationOptions<AddAttendanceMutation, AddAttendanceMutationVariables>;
export const GetFishByIdDocument = gql`
    query getFishById($id: ID!) {
  getFishById(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGetFishByIdQuery__
 *
 * To run a query within a React component, call `useGetFishByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFishByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFishByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFishByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFishByIdQuery, GetFishByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFishByIdQuery, GetFishByIdQueryVariables>(GetFishByIdDocument, options);
      }
export function useGetFishByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFishByIdQuery, GetFishByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFishByIdQuery, GetFishByIdQueryVariables>(GetFishByIdDocument, options);
        }
export type GetFishByIdQueryHookResult = ReturnType<typeof useGetFishByIdQuery>;
export type GetFishByIdLazyQueryHookResult = ReturnType<typeof useGetFishByIdLazyQuery>;
export type GetFishByIdQueryResult = Apollo.QueryResult<GetFishByIdQuery, GetFishByIdQueryVariables>;
export const AllFishAndFishingGroundsDocument = gql`
    query AllFishAndFishingGrounds {
  allFishingGround {
    id
    code
    label
  }
  allFish {
    id
    name
  }
}
    `;

/**
 * __useAllFishAndFishingGroundsQuery__
 *
 * To run a query within a React component, call `useAllFishAndFishingGroundsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFishAndFishingGroundsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFishAndFishingGroundsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllFishAndFishingGroundsQuery(baseOptions?: Apollo.QueryHookOptions<AllFishAndFishingGroundsQuery, AllFishAndFishingGroundsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFishAndFishingGroundsQuery, AllFishAndFishingGroundsQueryVariables>(AllFishAndFishingGroundsDocument, options);
      }
export function useAllFishAndFishingGroundsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFishAndFishingGroundsQuery, AllFishAndFishingGroundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFishAndFishingGroundsQuery, AllFishAndFishingGroundsQueryVariables>(AllFishAndFishingGroundsDocument, options);
        }
export type AllFishAndFishingGroundsQueryHookResult = ReturnType<typeof useAllFishAndFishingGroundsQuery>;
export type AllFishAndFishingGroundsLazyQueryHookResult = ReturnType<typeof useAllFishAndFishingGroundsLazyQuery>;
export type AllFishAndFishingGroundsQueryResult = Apollo.QueryResult<AllFishAndFishingGroundsQuery, AllFishAndFishingGroundsQueryVariables>;
export const CheckConnectionDocument = gql`
    query CheckConnection {
  getSession {
    uid
  }
}
    `;

/**
 * __useCheckConnectionQuery__
 *
 * To run a query within a React component, call `useCheckConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckConnectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckConnectionQuery(baseOptions?: Apollo.QueryHookOptions<CheckConnectionQuery, CheckConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckConnectionQuery, CheckConnectionQueryVariables>(CheckConnectionDocument, options);
      }
export function useCheckConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckConnectionQuery, CheckConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckConnectionQuery, CheckConnectionQueryVariables>(CheckConnectionDocument, options);
        }
export type CheckConnectionQueryHookResult = ReturnType<typeof useCheckConnectionQuery>;
export type CheckConnectionLazyQueryHookResult = ReturnType<typeof useCheckConnectionLazyQuery>;
export type CheckConnectionQueryResult = Apollo.QueryResult<CheckConnectionQuery, CheckConnectionQueryVariables>;