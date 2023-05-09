import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../types";

const initialState: Task[] = [];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        taskAdded(state, action) {
            state.push(action.payload);
        },
        taskUpdated(state, action) {
            const { id } = action.payload;
            return state.map((task) =>
                task.id === id ? action.payload : task
            );
        },
        taskDeleted(state, action) {
            return state.filter((task) => task.id !== action.payload.id);
        },
        taskCompleted(state, action) {
            return state.map((task) => ({
                ...task,
                isCompleted: task.isCompleted || task.id === action.payload.id,
            }));
        },
        tasksLoaded(state, action) {
            return action.payload;
        },
    },
});

export const {
    taskAdded,
    taskUpdated,
    tasksLoaded,
    taskDeleted,
    taskCompleted,
} = tasksSlice.actions;
export default tasksSlice.reducer;
