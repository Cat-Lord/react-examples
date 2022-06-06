import React from 'react';
import { Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import ErrorPage from '../globalErrorHandling/ErrorPage'
import { useAllStatisticsQuery } from '../graphql/generated/graphql-gen'
import AttendanceStatistics from './AttendanceStatistics'
import FishingGroundStatistics from './FishingGroundStatistics'
import FishStatistics from './FishStatistics'

function StatisticsDashboard() {
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
    <Tabs variant={'enclosed-colored'} size={'lg'}>
      <TabList>
        <Tab isDisabled={data.allAttendanceStatistics?.length === 0}>Attendance Statistics</Tab>
        <Tab isDisabled={data.allFishingGroundCatchStatistics?.length === 0}>Fishing Ground Statistics</Tab>
        <Tab isDisabled={data.allFishStatistics?.length === 0}>Fish Statistics</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <AttendanceStatistics items={data.allAttendanceStatistics} />
        </TabPanel>
        <TabPanel>
          <FishingGroundStatistics items={data.allFishingGroundCatchStatistics} />
        </TabPanel>
        <TabPanel>
          <FishStatistics items={data.allFishStatistics} />
        </TabPanel>
      </TabPanels>
    </Tabs >
  )
}

export default StatisticsDashboard