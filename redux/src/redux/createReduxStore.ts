import { configureStore } from '@reduxjs/toolkit';
import CourseSlice from './slices/courseSlice';

const reduxStore = configureStore({
  reducer: {
    courses: CourseSlice
  }
});

export default reduxStore; 