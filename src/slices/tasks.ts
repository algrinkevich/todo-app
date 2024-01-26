import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types";
import { RootState } from "../store";
import { TaskAppService } from "../services/TaskAppService";


export const CURRENT_TASKS = "currentTasks";

const initialState: Task[] = [];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        reinitFromLocalStorage(state) {
            return JSON.parse(localStorage.getItem(CURRENT_TASKS)) || [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                return state.filter((task) => task.id !== action.payload.id);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const { id } = action.payload;
                return state.map((task) =>
                    task.id === id ? action.payload : task
                );
            })
            .addCase(addTask.fulfilled, (state, action) => {
                return [...state, action.payload];
            });
    },
});

export const tasksSelector = (state: RootState) => state.tasks;

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", () => {
    const server = new TaskAppService();
    return server.getTasks();
});

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    (taskToDelete: Task) => {
        const server = new TaskAppService();
        return server.deleteTask(taskToDelete);
    }
);

export const updateTask = createAsyncThunk("tasks/updateTask", (task: Task) => {
    const server = new TaskAppService();
    return server.updateTask(task);
});

export const addTask = createAsyncThunk("tasks/addTask", (task: Task) => {
    const server = new TaskAppService();
    return server.createTask(task);
});

export const { reinitFromLocalStorage } = tasksSlice.actions;
export default tasksSlice.reducer;
