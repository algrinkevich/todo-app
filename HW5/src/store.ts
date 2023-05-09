import { configureStore} from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasks";
import popupsReducer from "./slices/popups";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        popups: popupsReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
