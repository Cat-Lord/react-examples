import { Button, Flex, GridItem, HStack, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { Form } from 'formik';
import React, { useContext } from 'react';
import { AddCatchFormProps, AttendanceContextProps } from '.';
import InputField from '../formComponents/InputField';
import SelectField from '../formComponents/SelectField';
import type { Fish, NewCatch } from '../graphql/generated/graphql-gen';
import { AttendanceContext } from './CreateAttendance';


const AddCatchForm: React.FC<AddCatchFormProps> = (props) => {
  const attendanceContext = useContext<AttendanceContextProps>(AttendanceContext);

  return (
    <Form>
      <HStack alignItems={'flex-start'} spacing={6} h='50vh'>
        <VStack spacing={4} pt={8}>
          <SelectField
            name='selectedFish'
            aria-label='Select Fish'
            items={attendanceContext.allFish}
            selectSize={'sm'}
            getKey={(fish: Fish) => fish.id}
            getValue={(fish: Fish) => fish.id + ": " + fish.name}
          />

          <SimpleGrid
            columns={3}
            justifyContent={'space-between'}
            w='100%'
          >
            <GridItem colSpan={2}>
              <VStack spacing={3}>
                <InputField
                  name='caughtFishAmount'
                  type={'number'}
                  placeholder='number of fish caught'
                  aria-label='Number of Fish Caught'
                  width={'50%'}
                  inputSize='sm'
                  required
                />
                <InputField
                  name='caughtFishTotalWeight'
                  type={'number'}
                  placeholder='total weight of fish caught'
                  aria-label='Total Weight of Fish Caught'
                  width={'50%'}
                  inputSize='sm'
                  required
                />
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <Flex
                w='100%' h='100%'
                direction={'row'}
                alignItems={'flex-end'}
                justifyContent={'flex-end'}
              >
                <Button
                  disabled={props.isSubmitting}
                  type='submit'
                  onClick={props.addCatchToTable}
                  size='lg'
                  border='1px'
                  borderColor='grey.100'
                >
                  +
                </Button>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </VStack>

        <TableContainer overflowY={'scroll'} >
          <Table overflowY={'scroll'} variant={'striped'}>
            <TableCaption m={0} placement='top'>Catches</TableCaption>

            <Thead>
              <Tr>
                <Th w={60}>Fish</Th>
                <Th w={20} isNumeric>Total Amount</Th>
                <Th w={20} isNumeric>Total Weight (kg)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                attendanceContext.catches.map((newCatch: NewCatch) => {
                  const fish = attendanceContext.allFish.find((currentFish: Fish) => currentFish.id === newCatch.fishID);
                  if (fish == undefined)
                    return null;
                  return (
                    <Tr key={newCatch.fishID}>
                      <Td>{fish.name}</Td>
                      <Td isNumeric>{newCatch.totalAmount}</Td>
                      <Td isNumeric>{newCatch.totalWeight}</Td>
                    </Tr>
                  );
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </HStack>
    </Form >
  );
};

export default AddCatchForm;