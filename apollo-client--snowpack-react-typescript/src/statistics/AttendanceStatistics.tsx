import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Spinner, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import ErrorPage from '../globalErrorHandling/ErrorPage';
import { AttendanceStatistics, useAttendanceStatisticsQuery } from '../graphql/generated/graphql-gen';

type AttendanceStatisticsProps = {

}

const AttendanceStatistics: React.FC<AttendanceStatisticsProps> = (props) => {
  const { error, loading, data } = useAttendanceStatisticsQuery();

  if (loading)
    return <Spinner />;

  if (error)
    throw error;

  if (data?.statistics?.length === 0)
    return (
      <ErrorPage boxSize='sm' fontSize='3xl' errorMessage='No attendance statistics found' />
    );

  return (
    <TableContainer h='100%' >
      <Table variant={'striped'}>
        <TableCaption m={0} placement='top'>Catches</TableCaption>

        <Thead>
          <Tr>
            <Th>Fishing Ground</Th>
            <Th isNumeric>Total Visits</Th>
            <Th isNumeric>Total Amount</Th>
            <Th isNumeric>Total Weight (kg)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data?.statistics?.map((fishingGroundStats) => {
              return (
                <Tr key={fishingGroundStats.fishingGround.id}>
                  <Td>{fishingGroundStats.fishingGround.label}</Td>
                  <Td isNumeric>{fishingGroundStats.totalNumberOfVisits}</Td>
                  <Td isNumeric>{fishingGroundStats.totalAmount}</Td>
                  <Td isNumeric>{fishingGroundStats.totalWeight}</Td>
                </Tr>
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default AttendanceStatistics