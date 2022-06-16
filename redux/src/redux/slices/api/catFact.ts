// Import the RTK Query methods from the React-specific entry point
import { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Middleware, Store } from 'redux';
import { ReduxStore } from '../..';
import { CatFact } from '../../../types';
import { useAppDispatch } from '../../reduxHooks';
import { storeFact } from '../catFacts';

type Status = {
  verified: boolean;
  feedback: string;
  sentCount: number;
};

type CatFactApiModel = {
  _id: string;
  _v: number;
  user: string;
  text: string;
  updatedAt: string;  // date as string
  sendDate: string;   // date as string
  deleted: boolean;
  source: string;
  type: string;
  status: Status;
};

export const catFactApi = createApi({
  reducerPath: "catApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://cat-fact.herokuapp.com/" }),
  endpoints: (builder) => ({
    getCatFact: builder.query<CatFact, void>({
      query: () => '/facts/random',

      transformResponse: (data: CatFactApiModel, _meta, _args) => {
        const fact: CatFact = {
          text: data?.text ?? '',
          updatedAt: data?.updatedAt ?? new Date().toDateString()
        };

        return fact;
      }
    })
  })
});

export const storeCatFact: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  ReduxStore
> = storeApi => next => (action: PayloadAction<CatFact, any, any>) => {

  // first complete the fetch, we don't want to store any possible failures
  next(action);

  if (action.type === 'catApi/executeQuery/fulfilled')
    storeApi.dispatch(storeFact(action.payload));
};

export const { useGetCatFactQuery } = catFactApi;