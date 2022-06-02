import { Button, Flex, GridItem, HStack, SimpleGrid, Table, TableCaption, TableContainer, TableContainerProps, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import React from 'react'
import InputField from '../forms/InputField'
import SelectField from '../forms/SelectField'
import type { Fish, NewCatch } from '../graphql/generated/graphql-gen'

type AddCatchFormProps = TableContainerProps & {
  allFish: Fish[]
  catches: NewCatch[]
  setCatches: React.Dispatch<React.SetStateAction<NewCatch[]>>   // use state setter function
  isSubmitting?: boolean
}

type FormValues = {
  selectedFish: string;
  caughtFishAmount: number;
  caughtFishTotalWeight: number;
}


const AddCatchForm: React.FC<AddCatchFormProps> = ({ allFish, catches, setCatches, isSubmitting, ...props }) => {
  const context = useFormikContext<any>();

  const addNewCatch = (newCatch: FormValues) => {
    const fish = catches.find((currentCatch) => currentCatch.fishID === newCatch.selectedFish)

    if (fish) {
      // update catch
      fish.totalAmount = newCatch.caughtFishAmount;
      fish.totalWeight = newCatch.caughtFishTotalWeight;

      const catchArray: NewCatch[] = []
      catches.map((currentCatch: NewCatch) => {
        if (currentCatch.fishID === newCatch.selectedFish)
          catchArray.push(fish)
        else
          catchArray.push(currentCatch)
      })

      setCatches(catchArray);
    }
    else {
      // insert new row record
      setCatches(catches.concat({
        fishID: newCatch.selectedFish,
        totalAmount: newCatch.caughtFishAmount,
        totalWeight: newCatch.caughtFishTotalWeight
      }));
    }
  }

  const resetCatchForm = () => {
    context.setFieldValue("selectedFish", allFish[0].id);
    context.setFieldValue("caughtFishAmount", 0);
    context.setFieldValue("caughtFishTotalWeight", 0.0);
  }

  const handleIntermediateSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    const { selectedFish, caughtFishAmount, caughtFishTotalWeight } = context.values;

    if (caughtFishAmount === 0)
      return;

    const values: FormValues = {
      selectedFish: selectedFish,
      caughtFishAmount: caughtFishAmount,
      caughtFishTotalWeight: caughtFishTotalWeight
    };

    const errs = await context.validateForm(values);

    const hasErrors = errs === undefined;
    if (hasErrors === false) {
      addNewCatch(values);
      resetCatchForm();
    }

    event.preventDefault(); // stop from propagating the submit to the parent form
  }

  return (
    <Form>
      <HStack alignItems={'flex-start'} spacing={6} h='50vh'>
        <VStack spacing={4} pt={8}>
          <SelectField
            name='selectedFish'
            aria-label='Select Fish'
            items={allFish}
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
                  disabled={isSubmitting}
                  type='submit'
                  onClick={handleIntermediateSubmit}
                  size='lg'
                >
                  +
                </Button>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </VStack>

        <TableContainer {...props} overflowY={'scroll'} >
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
                catches.map((newCatch: NewCatch) => {
                  const fish = allFish.find((currentFish) => currentFish.id === newCatch.fishID);
                  if (fish == undefined)
                    return null;
                  return (
                    <Tr key={newCatch.fishID}>
                      <Td>{fish.name}</Td>
                      <Td isNumeric>{newCatch.totalAmount}</Td>
                      <Td isNumeric>{newCatch.totalWeight}</Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </HStack>
    </Form >
  )
}

export default AddCatchForm