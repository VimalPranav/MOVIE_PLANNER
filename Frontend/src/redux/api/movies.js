import { apiSlice } from "./api_slice";
import { MOVIE_URL, UPLOAD_URL } from "../constants.js";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/`,
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create`,
        method: "POST",
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${MOVIE_URL}/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/${id}`,
    }),

    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/new`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top`,
    }),

    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),

    getTrendingMovies: builder.query({
      query: () => "/tmdb/trending",
    }),

    getTopRatedMovies: builder.query({
      query: () => "/tmdb/top-rated",
    }),

    searchTMDBMovies: builder.mutation({
      query: (query) => ({
        url: `/api/v1/tmdb/search?query=${encodeURIComponent(query)}`,
        method: "GET",
      }),
    }),

    addReview: builder.mutation({
    query: ({ movieId, userRating, comment }) => ({
      url: `${MOVIE_URL}/${movieId}/reviews`,
      method: "POST",
      body: { userRating, comment },
    }),
  }),
  }),
});

export const {
    useGetAllMoviesQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useGetSpecificMovieQuery,
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
    useUploadImageMutation,
    useGetTrendingMoviesQuery,
    useGetTopRatedMoviesQuery,
    useSearchTMDBMoviesMutation,
    useAddReviewMutation,
} = moviesApiSlice;