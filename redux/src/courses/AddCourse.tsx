import React, { useState } from 'react';
import { useAppDispatch } from '../redux/reduxHooks';
import { addCourse } from '../redux/slices/courseSlice';
import { Course } from '../types/';

const AddCourse: React.FC = () => {
  const [courseLabel, setCourseLabel] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCourseLabel(e.currentTarget.value);
  };

  const createCourse = (label: string): Course => {
    return {
      title: label
    };
  };

  return (
    <div>
      <form onSubmit={(e: any) => {
        console.log('submitting ' + courseLabel);
        dispatch(
          addCourse(
            createCourse(courseLabel)
          )
        );
        setCourseLabel('');
        e.preventDefault();
      }}>
        <label htmlFor="submit-input">Add Course</label>
        <input onChange={handleChange} type='text' value={courseLabel} placeholder='New Course' />
        <button type="submit" name="submit-input">Submit</button>
      </form>
    </div >
  );
};

export default AddCourse;