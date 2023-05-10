import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { CURRENT_TASKS } from "./slices/tasks";
import popupsReducer from "./slices/popups";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        popups: popupsReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem(
        CURRENT_TASKS,
        JSON.stringify(store.getState().tasks)
    );
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
