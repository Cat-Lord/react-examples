import React, { useState } from 'react'
import { Box, Button, Spinner } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import InputField from '../forms/InputField';
import SelectField from '../forms/SelectField';
import { FishingGround, useAllFishAndFishingGroundsQuery } from '../graphql/generated/graphql-gen';
import AddCatchForm from './AddCatchForm';


const CreateAttendance: React.FC = () => {
  const { error, loading, data } = useAllFishAndFishingGroundsQuery();

  if (loading)
    return <Spinner />;

  if (error)
    throw error;

  if (data === undefined || data.allFishingGround === undefined || data.allFishingGround === null)
    throw new Error('Unable to load Fishing Grounds, data undefined');


  return (
    <Box w='90%' m='8'>
      <Formik initialValues={{
        allFishingGrounds: data.allFishingGround[0].id,
        numberOfVisits: 0,
      }} onSubmit={(values) => console.log(values)} >
        {() => (
          <Form>
            <SelectField
              name='allFishingGrounds'
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

            <Button type='submit'>Add</Button>
          </Form>
        )}
      </Formik>

      <AddCatchForm allFish={data.allFish} />
    </Box>
  )
}

export default CreateAttendance