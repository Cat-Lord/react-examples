import { useFormikContext } from 'formik';
import React, { useContext } from 'react';
import { AddCatchFormValues, AddCatchProps, AttendanceContextProps, AttendanceFormValues } from '.';
import { NewCatch } from '../graphql/generated/graphql-gen';
import AddCatchForm from './AddCatchForm';
import { AttendanceContext } from './CreateAttendance';


const AddCatch: React.FC<AddCatchProps> = (props) => {
  const context = useFormikContext<AttendanceFormValues>();
  const attendanceContext = useContext<AttendanceContextProps>(AttendanceContext);

  if (attendanceContext === null) {
    console.error('Context is not defined');
    return null;
  }

  const addNewCatch = (newCatch: AddCatchFormValues) => {

    const fish = attendanceContext.catches.find((currentCatch: NewCatch) => currentCatch.fishID === newCatch.selectedFish);

    if (fish) {
      // update catch
      fish.totalAmount = newCatch.caughtFishAmount;
      fish.totalWeight = newCatch.caughtFishTotalWeight;

      const catchArray: NewCatch[] = [];
      attendanceContext.catches.map((currentCatch: NewCatch) => {
        if (currentCatch.fishID === newCatch.selectedFish)
          catchArray.push(fish);
        else
          catchArray.push(currentCatch);
      });

      attendanceContext.setCatches(catchArray);
    }
    else {
      // insert new row record
      attendanceContext.setCatches(
        attendanceContext.catches.concat({
          fishID: newCatch.selectedFish,
          totalAmount: newCatch.caughtFishAmount,
          totalWeight: newCatch.caughtFishTotalWeight
        }));
    }
  };

  const resetCatchForm = () => {
    context.setFieldValue("selectedFish", attendanceContext.allFish[0].id);
    context.setFieldValue("caughtFishAmount", 0);
    context.setFieldValue("caughtFishTotalWeight", 0.0);
  };

  const createCatchFromFormValues = async (event: React.MouseEvent<HTMLElement>) => {
    const { selectedFish, caughtFishAmount, caughtFishTotalWeight } = context.values;

    if (caughtFishAmount === 0)
      return;

    const values: AddCatchFormValues = {
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
  };

  return (
    <AddCatchForm addCatchToTable={createCatchFromFormValues} />
  );
};

export default AddCatch;