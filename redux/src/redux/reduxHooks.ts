import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { ReduxStore, AppDispatch } from "./index";

// Don't use raw 'useSelector' or raw 'useDispatch'
export const useStoreSelector: TypedUseSelectorHook<ReduxStore> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();