import { configureStore } from '@reduxjs/toolkit';
import CourseSlice from './slices/courseSlice';

const reduxStore = configureStore({
  reducer: {
    courses: CourseSlice
  }
});

export type ReduxStore = ReturnType<typeof reduxStore.getState>;

export default reduxStore; 