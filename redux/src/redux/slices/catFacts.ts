import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ReduxStore } from "..";
import { CatFact } from "../../types/index";


type CatFactsState = {
  facts: CatFact[];
};

const initialState: CatFactsState = {
  facts: []
};

const isNotEmptyString = (text: string): boolean => {
  return text.match(/\s*/) !== null;
};

const CatFactSlice: Slice = createSlice({
  name: 'catFacts',
  initialState: initialState,
  reducers: {
    storeFact: (state: CatFactsState, action: PayloadAction<CatFact>) => {
      if (isNotEmptyString(action.payload.text))
        state.facts.push(action.payload);
    }
  }
});

export const catFactSliceSelector = (state: ReduxStore) => {
  return state.catFacts;
};

export const { storeFact } = CatFactSlice.actions;

export default CatFactSlice.reducer;