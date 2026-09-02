import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    filters: null,
    isAiSearch: false,
};

const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        setAiResults: (state, action) => {
            state.movies = action.payload.movies;
            state.filters = action.payload.filters;
            state.isAiSearch = true;
        },

        clearAiResults: (state) => {
            state.movies = [];
            state.filters = null;
            state.isAiSearch = false;
        },
    },
});

export const { setAiResults, clearAiResults } = aiSlice.actions;

export default aiSlice.reducer;