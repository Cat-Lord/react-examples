import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Course } from "../../types/index";
import { ReduxStore } from "../index";

type CourseSliceState = {
  courses: Course[];
};

const initialState: CourseSliceState = {
  courses: []
};

const CourseSlice: Slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (store: ReduxStore, action: PayloadAction<Course>) => {
      store.courses.push(action.payload);
    }

  }
});

export const coursesSelector = (state: ReduxStore) => {
  return state.courses;
};

export const { addCourse } = CourseSlice.actions;

export default CourseSlice.reducer;