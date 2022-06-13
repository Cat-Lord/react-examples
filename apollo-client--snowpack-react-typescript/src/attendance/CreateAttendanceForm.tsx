import { Box, Button, HStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { AttendanceContextProps, AttendanceFormValues, CreateAttendanceProps } from '.';
import InputField from '../formComponents/InputField';
import SelectField from '../formComponents/SelectField';
import { FishingGround } from '../graphql/generated/graphql-gen';
import AddCatch from './AddCatch';
import { AttendanceContext } from './CreateAttendance';
import NewAttendances from './NewAttendances';


const CreateAttendanceForm: React.FC<CreateAttendanceProps> = (props) => {
  const attendanceContext = useContext<AttendanceContextProps>(AttendanceContext);

  const formInitialValues: AttendanceFormValues = {
    selectedFishingGround: attendanceContext.allFishingGround[0].id ?? '',
    numberOfVisits: 0,

    // add catch form
    selectedFish: attendanceContext.allFish[0].id ?? '',
    caughtFishAmount: 0,
    caughtFishTotalWeight: 0.0
  };

  return (
    <HStack p={7} spacing={69} h='100%' alignItems={'flex-start'} position={'relative'}>
      <Formik
        initialValues={props.initialFormValues ? props.initialFormValues : formInitialValues}
        onSubmit={props.handleSubmit}

        validateOnChange={false}  // only validate when submitting
        validateOnBlur={false}
        validate={props.validate}
      >
        {({ isSubmitting }) => (
          <Box position={'relative'}>
            <Form>
              <SelectField
                name='selectedFishingGround'
                aria-label='Fishing Ground Selection'
                items={attendanceContext.allFishingGround}
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
                type='submit'
                height='48px'
                width='200px'
                border='2px'
                borderColor='grey.500'
              >
                Add
              </Button>
            </Form>

            {/* <Divider p={3} /> */}

            <AddCatch isSubmitting={isSubmitting} />
          </Box>
        )}
      </Formik>

      <NewAttendances minW={'md'} maxH='' attendances={props.attendances} />
    </HStack>
  );
};

export default CreateAttendanceForm;