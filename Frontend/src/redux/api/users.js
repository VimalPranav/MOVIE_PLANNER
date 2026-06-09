import { apiSlice } from "./api_slice";
import { USERS_URL } from "../constants.js";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),

        toggleFavourite: builder.mutation({
            query: (movieId) => ({
              url: `${USERS_URL}/fav/${movieId}`,
              method: "POST",
            }),
        }),
        
        getFavourites: builder.query({
            query: () => `${USERS_URL}/fav`,
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation, useGetFavouritesQuery, useToggleFavouriteMutation } = usersApiSlice;