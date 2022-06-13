import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { FishingGroundStatisticsProps } from '.';

const FishingGroundStatistics: React.FC<FishingGroundStatisticsProps> = ({ items }) => {
  return (
    <Box>
      <Accordion
        defaultIndex={items?.map((_stat, index) => index)}  // toggle all items on
        allowMultiple
        allowToggle
      >
        {
          items?.map((stats) => {
            return (
              <AccordionItem key={stats.fishingGround.id}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {stats.fishingGround.label}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <TableContainer h='100%' >
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
                          stats.catchStatistics.map((fishingGroundStats) => {
                            return (
                              <Tr key={fishingGroundStats.fish.id}>
                                <Td>{fishingGroundStats.fish.name}</Td>
                                <Td isNumeric>{fishingGroundStats.totalAmount}</Td>
                                <Td isNumeric>{fishingGroundStats.totalWeight}</Td>
                              </Tr>
                            );
                          })
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
              </AccordionItem>
            );
          })
        }
      </Accordion >
    </Box>
  );

};

export default FishingGroundStatistics;