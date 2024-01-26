import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SearchState } from "../types";


const initialState: SearchState = {
    query: "",
    tag: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        setTag(state, action) {
            state.tag = action.payload;
        },
    },
});

export const { setQuery, setTag } = searchSlice.actions;
export const querySelector = (state: RootState) => state.search.query;
export const tagSelector = (state: RootState) => state.search.tag;
export default searchSlice.reducer;
