import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import InputField from '../forms/InputField'
import SelectField from '../forms/SelectField'
import type { Fish } from '../graphql/generated/graphql-gen'

type AddCatchFormProps = {
  allFish: Fish[]
}

type FormValues = {
  selectedFish: string;
  caughtFishAmount: number;
  caughtFishTotalWeight: number;
}

type CatchTableRow = {
  selectedFish: Fish
  caughtFishAmount: number
  caughtFishTotalWeight: number
}


const AddCatchForm: React.FC<AddCatchFormProps> = ({ allFish }) => {

  const addNewCatch = (newCatch: FormValues) => {
    const fish = catches.find((currentCatch) => currentCatch.selectedFish!.id === newCatch.selectedFish)

    if (fish) {
      console.log('Updating record with id ' + newCatch.selectedFish);

      // update catch
      fish.caughtFishAmount = newCatch.caughtFishAmount;
      fish.caughtFishTotalWeight = newCatch.caughtFishTotalWeight;
    }
    else {
      console.log('Inserting new record');

      // insert new row record
      const selectedFish = allFish.find((fish) => fish.id === newCatch.selectedFish);
      if (selectedFish) {
        setCatches(catches.concat({
          selectedFish: selectedFish,
          caughtFishAmount: newCatch.caughtFishAmount,
          caughtFishTotalWeight: newCatch.caughtFishTotalWeight
        }));
      }
    }
  }

  return (
    <Box w='100%' m='5'>
      <Formik
        initialValues={{
          selectedFish: allFish[0].id,
          caughtFishAmount: 0,
          caughtFishTotalWeight: 0.0
        }}
        onSubmit={(newCatch) => {
          console.log('submitting');
          console.log(newCatch);
          console.log(catches);

          addNewCatch(newCatch);
        }
        }>
        {() => (
          <Form>
            <SelectField
              name='selectedFish'
              aria-label='Select Fish'
              items={allFish}
              getKey={(fish: Fish) => fish.id}
              getValue={(fish: Fish) => fish.id + ": " + fish.name}
            />
            <InputField
              name='caughtFishAmount'
              type={'number'}
              placeholder='number of fish caught'
              aria-label='Number of Fish Caught'
              required
            />
            <InputField
              name='caughtFishTotalWeight'
              type={'number'}
              placeholder='total weight of fish caught'
              aria-label='Total Weight of Fish Caught'
              required
            />

            <TableContainer>
              <Table >
                <Thead>
                  <Tr>
                    <Th w='60'>Fish</Th>
                    <Th w='20' isNumeric>Total Amount</Th>
                    <Th w='20' isNumeric>Total Weight (kg)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    catches.map((newCatch: CatchTableRow) => {
                      return (
                        <Tr key={newCatch.selectedFish.id}>
                          <Td>{newCatch.selectedFish.name}</Td>
                          <Td isNumeric>{newCatch.caughtFishAmount}</Td>
                          <Td isNumeric>{newCatch.caughtFishTotalWeight}</Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
            </TableContainer>
            <Button type='submit'>+</Button>
          </Form>
        )}
      </Formik>
    </Box >
  )
}

export default AddCatchForm