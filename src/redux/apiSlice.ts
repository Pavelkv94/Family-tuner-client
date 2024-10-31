import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.API_URL }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getStations: builder.query({
      query: () => `/stations`,
    }),
    getFavorites: builder.query({
      query: (user_id) => `/users/${user_id}/favorites`,
      providesTags: (result) =>
        result
          ? [...result.map(({ station_id }: { station_id: string }) => ({ type: "Favorites", id: station_id })), { type: "Favorites", id: "LIST" }]
          : [{ type: "Favorites", id: "LIST" }],
    }),
    addToFavorites: builder.mutation({
      query: (newData) => ({
        url: `/users/${newData.user_id}/addFavorites`,
        method: "POST",
        body: { station_id: newData.station_id },
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
    removeToFavorites: builder.mutation({
      query: (newData) => ({
        url: `/users/${newData.user_id}/removeFavorites`,
        method: "POST",
        body: { station_id: newData.station_id },
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
  }),
});

export const { useGetStationsQuery, useGetFavoritesQuery, useAddToFavoritesMutation, useRemoveToFavoritesMutation } = apiSlice;
