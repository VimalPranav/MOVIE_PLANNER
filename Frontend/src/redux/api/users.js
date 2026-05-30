import { apiSlice } from "./api_slice";
import { USER_URL } from "../constants.js";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation } = usersApiSlice;