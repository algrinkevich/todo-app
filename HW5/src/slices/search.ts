import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    query: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
    },
});

export const { setQuery } = searchSlice.actions;
export const querySelector = (state: RootState) => state.search.query;
export default searchSlice.reducer;
