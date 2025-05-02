import { configureStore } from '@reduxjs/toolkit';
import {reducerManager} from "./ReducerManager.ts";

export const reduxSetup = configureStore({
    reducer: {
        [reducerManager.reducerPath]: reducerManager.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reducerManager.middleware),
});

export type RootState = ReturnType<typeof reduxSetup.getState>;
export type AppDispatch = typeof reduxSetup.dispatch;
