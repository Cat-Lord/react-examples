import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { FishStatisticsProps } from '.';

const FishStatistics: React.FC<FishStatisticsProps> = ({ items }) => {
  return (
    <TableContainer>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th>Fish</Th>
            <Th isNumeric>Total Amount</Th>
            <Th isNumeric>Total Weight (kg)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            items?.map((fishStats) => {
              return (
                <Tr key={fishStats.fish.id}>
                  <Td>{fishStats.fish.name}</Td>
                  <Td isNumeric>{fishStats.totalAmount}</Td>
                  <Td isNumeric>{fishStats.totalWeight}</Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FishStatistics;