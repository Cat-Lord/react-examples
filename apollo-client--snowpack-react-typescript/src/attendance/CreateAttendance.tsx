import { ErrorResponse } from '@apollo/client/link/error';
import { useToast, Spinner } from '@chakra-ui/react';
import { FormikHelpers, FormikErrors } from 'formik';
import React, { createContext, useState } from 'react';
import { Attendance, AttendanceContextProps, AttendanceFormValues } from '.';
import { useAllFishAndFishingGroundsQuery, useAddAttendanceMutation, AllStatisticsDocument, NewCatch } from '../graphql/generated/graphql-gen';
import CreateAttendanceForm from './CreateAttendanceForm';

export const AttendanceContext = createContext<AttendanceContextProps>(null!);    // default props not important but required

const CreateAttendance: React.FC = () => {
  const { error, loading, data } = useAllFishAndFishingGroundsQuery();
  const { allFish, allFishingGround } = { ...data };
  const [addAttendanceMutation] = useAddAttendanceMutation({
    // update statistics on each successful addition
    refetchQueries: [
      { query: AllStatisticsDocument },
    ]
  });

  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [catches, setCatches] = useState<NewCatch[]>([]);
  const toast = useToast();

  if (loading)
    return <Spinner />;

  if (error)
    throw error;

  if (data === undefined || allFishingGround === undefined || allFish === undefined)
    throw new Error('Unable to load Fishing Grounds, data undefined');


  const createNewAttendance = (values: AttendanceFormValues): Attendance => {
    const { selectedFishingGround, numberOfVisits } = values;
    const fishingGround = allFishingGround.find((ground) => ground.id === selectedFishingGround);
    return {
      fishingGround: fishingGround!,
      numberOfVisits: numberOfVisits,
      catches: catches
    };
  };

  // Replace attendance if it was already added, otherwise add it
  const updateAttendancesArray = (newAttendance: Attendance): void => {
    const allAttendances: Attendance[] = [];

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
  };

  const handleSubmit = async (values: AttendanceFormValues, actions: FormikHelpers<AttendanceFormValues>): Promise<void> => {
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
  };

  const validate = (values: AttendanceFormValues): FormikErrors<AttendanceFormValues> | undefined => {
    const errors: FormikErrors<AttendanceFormValues> = {};

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
  };


  const contextValues: AttendanceContextProps = {
    allFish: allFish,
    allFishingGround: allFishingGround,
    catches: catches,
    setCatches: setCatches
  };

  return (
    <AttendanceContext.Provider value={contextValues} >
      <CreateAttendanceForm
        attendances={attendances}
        handleSubmit={handleSubmit}
        validate={validate}
      />
    </AttendanceContext.Provider>
  );
};

export default CreateAttendance;