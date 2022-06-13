import React from 'react';
import { Spinner } from '@chakra-ui/react';
import ErrorPage from '../globalErrorHandling/ErrorPage';
import { useAllStatisticsQuery } from '../graphql/generated/graphql-gen';
import StatisticsDashboard from './StatisticsDashboard';

function Statistics () {
  const { error, loading, data } = useAllStatisticsQuery();

  if (loading)
    return <Spinner />;

  if (error)
    throw error;

  if (data === null || data === undefined)
    return (
      <ErrorPage boxSize='sm' fontSize='3xl' errorMessage='No attendance statistics found' />
    );

  return (
    <StatisticsDashboard data={data} />
  );
}

export default Statistics;