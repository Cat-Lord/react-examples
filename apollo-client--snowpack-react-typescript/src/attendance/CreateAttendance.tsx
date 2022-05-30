import React, { useState } from 'react'
import { Alert, AlertIcon, Box, Button, Center, Heading, Spinner, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikErrors } from 'formik';
import InputField from '../forms/InputField';
import SelectField from '../forms/SelectField';
import { FishingGround, NewCatch, useAddAttendanceMutation, useAllFishAndFishingGroundsQuery } from '../graphql/generated/graphql-gen';
import AddCatchForm from './AddCatchForm';
import type { ErrorHandler, ErrorResponse } from '@apollo/client/link/error';

type FormInitialValues = {
  selectedFishingGround: string
  numberOfVisits: number

  // add catch form
  selectedFish: string
  caughtFishAmount: number
  caughtFishTotalWeight: number
}

const CreateAttendance: React.FC = () => {
  const { error, loading, data } = useAllFishAndFishingGroundsQuery();
  const [addAttendanceMutation] = useAddAttendanceMutation();
  const [catches, setCatches] = useState<NewCatch[]>([]);
  const toast = useToast();

  if (loading)
    return <Spinner />;

  if (error)
    throw error;

  if (data === undefined || data.allFishingGround === undefined || data.allFishingGround === null)
    throw new Error('Unable to load Fishing Grounds, data undefined');

  const { allFish, allFishingGround } = data;
  const formInitialValues: FormInitialValues = {
    selectedFishingGround: allFishingGround[0].id ?? '',
    numberOfVisits: 0,

    // add catch form
    selectedFish: allFish[0].id ?? '',
    caughtFishAmount: 0,
    caughtFishTotalWeight: 0.0
  };

  return (
    <Center>
      <Box w='90%' m='8'>
        <Formik
          initialValues={formInitialValues}

          onSubmit={async (values) => {
            const { selectedFishingGround, numberOfVisits } = values;
            await addAttendanceMutation({
              variables: {
                fishingGroundID: selectedFishingGround,
                totalVisits: numberOfVisits,
                catches: catches
              }
            }).catch((error: ErrorResponse) => {
              const message = error.networkError?.cause?.message ?? 'Unexpected Error 😔';

              toast({
                title: message,
                description: "",
                status: 'error',
                duration: 4000,
                position: 'bottom-right',
                isClosable: false,
              });

              throw error;
            });
          }}

          validateOnChange={false}  // only validate when submitting
          validateOnBlur={false}
          validate={(values) => {
            const errors: FormikErrors<FormInitialValues> = {}

            // visits must be > 0
            if (values.numberOfVisits <= 0)
              errors.numberOfVisits = "Number of visits must be > 0";

            // positive numbers only
            // caught fish can be zero because all fish could've been already inserted
            if (values.caughtFishAmount < 0)
              errors.caughtFishAmount = "Must be greater or equal to 0";
            if (values.caughtFishTotalWeight < 0)
              errors.caughtFishAmount = "Must be greater or equal to 0";

            // logical checks
            if (values.caughtFishAmount == 0 && values.caughtFishTotalWeight != 0)
              errors.caughtFishAmount = "No fish caught but weight is set";

            if (values.caughtFishTotalWeight == 0 && values.caughtFishAmount != 0)
              errors.caughtFishAmount = "No weight set for caught fish";

            console.log('Errors in parent form', errors);
            console.log('NO keys ? ', Object.keys(errors).length);

            if (Object.keys(errors).length === 0)
              return undefined;
            return errors;
          }}
        >
          {({ isSubmitting }) => (
            <>
              <Form>
                <SelectField
                  name='selectedFishingGround'
                  aria-label='Fishing Ground Selection'
                  items={data.allFishingGround}
                  getKey={(fishingGround: FishingGround) => fishingGround.id}
                  getValue={(fishingGround: FishingGround) => fishingGround.code + ": " + fishingGround.label}
                />
                <InputField
                  name='numberOfVisits'
                  type={'number'}
                  placeholder='number of visits'
                  aria-label='Number of visits'
                  required
                />
                <Button disabled={isSubmitting} type='submit'>Add</Button>
              </Form>

              <AddCatchForm isSubmitting={isSubmitting} allFish={data.allFish} catches={catches} setCatches={setCatches} />
            </>
          )}
        </Formik>
      </Box >
    </Center >
  )
}

export default CreateAttendance