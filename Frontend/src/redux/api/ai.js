import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api_slice";
import { AI_URL } from "../constants";

export const aiApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        aiMovieSearch: builder.mutation({
            query: (prompt) => ({
                url: `${AI_URL}/search`,
                method: "POST",
                body: { prompt },
            }),
        }),
    }),
});

export const {
    useAiMovieSearchMutation,
} = aiApiSlice;