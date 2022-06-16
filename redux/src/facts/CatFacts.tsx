import React from 'react';
import { Spinner } from 'react-bootstrap';
import { ReduxStore } from '../redux';
import { useStoreSelector } from '../redux/reduxHooks';
import { useGetCatFactQuery } from '../redux/slices/api/catFact';
import { CatFact } from '../types';
import CatFactsView from './CatFactsView';

const CatFacts: React.FC = () => {
  const { data: currentFact, error, isFetching, isLoading, refetch } = useGetCatFactQuery();
  const facts: CatFact[] = useStoreSelector((state: ReduxStore) => state.catFacts.facts);

  if (isLoading)
    return <Spinner animation='border' />;

  if (error !== null && error !== undefined) {
    console.error(error);

    return <h2>Sike, error occurred</h2>;
  }

  if (facts === undefined || facts.length === 0)
    return (
      <h2>
        No facts available.
      </h2>
    );

  return (
    <CatFactsView facts={facts} isFetching={isFetching} getNewFact={refetch} />
  );
};

export default CatFacts;