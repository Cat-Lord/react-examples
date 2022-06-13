import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { StatisticsDashboardProps } from '.';
import AttendanceStatistics from './AttendanceStatistics';
import FishingGroundStatistics from './FishingGroundStatistics';
import FishStatistics from './FishStatistics';

const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({ data }) => {
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
    </Tabs>
  );
};

export default StatisticsDashboard;