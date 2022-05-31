import { Box } from '@chakra-ui/react'
import React from 'react'
import AttendanceStatistics from './AttendanceStatistics'
import FishingGroundStatistics from './FishingGroundStatistics'
import FishStatistics from './FishStatistics'

function StatisticsDashboard() {
  return (
    <Box>
      <AttendanceStatistics />
      <FishingGroundStatistics />
      <FishStatistics />
    </Box>
  )
}

export default StatisticsDashboard