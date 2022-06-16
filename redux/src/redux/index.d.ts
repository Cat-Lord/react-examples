import { Dispatch } from "react";
import reduxStore from "./createReduxStore";

export type ReduxStore = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
