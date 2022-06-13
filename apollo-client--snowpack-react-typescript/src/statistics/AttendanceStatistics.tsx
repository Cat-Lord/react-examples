import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { AttendanceStatisticsProps } from '.';

const AttendanceStatistics: React.FC<AttendanceStatisticsProps> = ({ items }) => {
  return (
    <TableContainer>
      <Table variant={'striped'}>
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
            items?.map((fishingGroundStats) => {
              return (
                <Tr key={fishingGroundStats.fishingGround.id}>
                  <Td>{fishingGroundStats.fishingGround.label}</Td>
                  <Td isNumeric>{fishingGroundStats.totalNumberOfVisits}</Td>
                  <Td isNumeric>{fishingGroundStats.totalAmount}</Td>
                  <Td isNumeric>{fishingGroundStats.totalWeight}</Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceStatistics;