import type { ErrorResponse } from '@apollo/client/link/error';
import { Box, Button, HStack, Spinner, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import type { Attendance } from '.';
import InputField from '../forms/InputField';
import SelectField from '../forms/SelectField';
import { AttendanceStatisticsDocument, FishingGround, NewCatch, useAddAttendanceMutation, useAllFishAndFishingGroundsQuery } from '../graphql/generated/graphql-gen';
import AddCatchForm from './AddCatchForm';
import NewAttendances from './NewAttendances';

type FormValues = {
  selectedFishingGround: string
  numberOfVisits: number

  // add catch form
  selectedFish: string
  caughtFishAmount: number
  caughtFishTotalWeight: number
}


const CreateAttendance: React.FC = () => {
  const { error, loading, data } = useAllFishAndFishingGroundsQuery();
  const [addAttendanceMutation] = useAddAttendanceMutation({
    refetchQueries: [{ query: AttendanceStatisticsDocument }]   // update statistics on each successful addition
  });
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [catches, setCatches] = useState<NewCatch[]>([]);
  const toast = useToast();

  if (loading)
    return <Spinner />;

  if (error)
    throw error;

  if (data === undefined || data.allFishingGround === undefined || data.allFishingGround === null)
    throw new Error('Unable to load Fishing Grounds, data undefined');


  const { allFish, allFishingGround } = data;
  const formInitialValues: FormValues = {
    selectedFishingGround: allFishingGround[0].id ?? '',
    numberOfVisits: 0,

    // add catch form
    selectedFish: allFish[0].id ?? '',
    caughtFishAmount: 0,
    caughtFishTotalWeight: 0.0
  };

  const createNewAttendance = (values: FormValues): Attendance => {
    const { selectedFishingGround, numberOfVisits } = values;
    const fishingGround = allFishingGround.find((ground) => ground.id === selectedFishingGround);
    return {
      fishingGround: fishingGround!,
      numberOfVisits: numberOfVisits,
      catches: catches
    }
  }

  // Replace attendance if it was already added, otherwise add it
  const updateAttendancesArray = (newAttendance: Attendance): void => {
    const allAttendances: Attendance[] = []

    let added = false;
    attendances.forEach(att => {
      if (att.fishingGround.id === newAttendance.fishingGround.id) {
        allAttendances.push(newAttendance);   // update old record
        added = true;
      }
      else
        allAttendances.push(att);
    });

    if (added == false)
      allAttendances.push(newAttendance);

    setAttendances(allAttendances);
  }

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const newAttendance: Attendance = createNewAttendance(values);

    await addAttendanceMutation({
      variables: {
        fishingGroundID: newAttendance.fishingGround.id,
        totalVisits: newAttendance.numberOfVisits,
        catches: catches
      }
    })
      .catch((error: ErrorResponse) => {
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

    updateAttendancesArray(newAttendance);
    setCatches([]);
    actions.resetForm();
  }

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}

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

    if (Object.keys(errors).length === 0)
      return undefined;

    return errors;
  }


  return (
    <HStack p={7} spacing={69} h='100%' alignItems={'flex-start'} position={'relative'}>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSubmit}

        validateOnChange={false}  // only validate when submitting
        validateOnBlur={false}
        validate={validate}
      >
        {({ isSubmitting }) => (
          <Box position={'relative'}>
            <Form>
              <SelectField
                name='selectedFishingGround'
                aria-label='Fishing Ground Selection'
                items={data.allFishingGround}
                getKey={(fishingGround: FishingGround) => fishingGround.id}
                getValue={(fishingGround: FishingGround) => fishingGround.code + ": " + fishingGround.label}
                width='35%'
              />
              <InputField
                name='numberOfVisits'
                type={'number'}
                placeholder='number of visits'
                aria-label='Number of visits'
                width='10%'
                required
              />

              <Button
                disabled={isSubmitting}
                position='absolute'
                bottom={0}
                right={0}
                size='lg'
                type='submit'
              >
                Add
              </Button>
            </Form>

            {/* <Divider p={3} /> */}

            <AddCatchForm
              isSubmitting={isSubmitting}
              allFish={data.allFish}
              catches={catches}
              setCatches={setCatches}
            />
          </Box>
        )}
      </Formik>

      <NewAttendances minW={'md'} maxH='' attendances={attendances} />
    </HStack>
  )
}

export default CreateAttendance