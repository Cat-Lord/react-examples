import { configureStore, Store } from '@reduxjs/toolkit';
import { catFactApi, storeCatFact } from './slices/api/catFact';
import CourseSlice from './slices/courseSlice';
import CatFactSlice from './slices/catFacts';

const reduxStore: Store = configureStore({
  reducer: {
    courses: CourseSlice,
    catFacts: CatFactSlice,
    [catFactApi.reducerPath]: catFactApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(catFactApi.middleware)
    .concat(storeCatFact)
});

export default reduxStore; 