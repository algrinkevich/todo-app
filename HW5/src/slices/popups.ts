import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PopupsState, Task } from "../types";

const initialState: PopupsState = {
    showAddPopup: false,
    editableTask: null,
};

const popupsSlice = createSlice({
    name: "popups",
    initialState,
    reducers: {
        showAddPopup(state) {
            state.showAddPopup = true;
        },
        hideAddPopup(state) {
            state.showAddPopup = false;
        },
        showEditPopup(state, action) {
            state.editableTask = action.payload;
        },
        hideEditPopup(state) {
            state.editableTask = null;
        },
    },
});

export const showAddPopupSelector = (state: RootState) =>
    state.popups.showAddPopup;
export const showEditPopupSelector = (state: RootState) =>
    state.popups.editableTask !== null;
export const editableTaskSelector = (state: RootState) =>
    state.popups.editableTask;

export const { showAddPopup, hideAddPopup, showEditPopup, hideEditPopup } =
    popupsSlice.actions;

export default popupsSlice.reducer;
