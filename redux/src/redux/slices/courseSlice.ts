import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Course } from "../../types/index.d";
import { ReduxStore } from "../createReduxStore";

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
      store.courses.push(action);
    }

  }
});

export const coursesSelector = (state: any) => {
  return state.courses;
};

export const { addCourse } = CourseSlice.actions;

export default CourseSlice.reducer;