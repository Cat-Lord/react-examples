import { Box, Divider, Heading, StackProps, Stat, StatGroup, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import React from 'react';
import type { Attendance } from '.';

type NewAttendancesProps = StackProps & {
  attendances: Attendance[];
}

const NewAttendances: React.FC<NewAttendancesProps> = ({ attendances, ...props }) => {
  attendances.sort((attA: Attendance, attB: Attendance) => {
    return attA.fishingGround.label.localeCompare(attB.fishingGround.label);
  })

  return (
    <Box overflowY={'scroll'} overflowX='clip' p={4}>
      <VStack w='100%'{...props} alignItems={'flex-start'} spacing={7}>
        {
          attendances.map((attendance) => {
            return (
              <Box key={attendance.fishingGround.id} w='100%'>
                <Heading fontSize={'md'}>{attendance.fishingGround.label}</Heading>
                <Divider m={1} />
                <StatGroup>
                  <Stat>
                    <StatLabel>Visits</StatLabel>
                    <StatNumber fontSize={'large'}>{attendance.numberOfVisits}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Catches</StatLabel>
                    <StatNumber fontSize={'large'}>{attendance.catches.length}</StatNumber>
                  </Stat>
                </StatGroup>
              </Box>
            )
          })
        }
      </VStack >
    </Box>
  )
}

export default NewAttendances