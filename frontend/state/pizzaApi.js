import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/pizza" }),
  tagTypes: ["Pizza"],
  endpoints: (build) => ({
    getPizzas: build.query({
      query: () => "/history",
      providesTags: ["Pizza"],
    }),
    invalidateTags: ["Pizza"],
    createPizza: build.mutation({
      query: (pizza) => ({
        url: "/order",
        body: pizza,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Pizza"],
    }),
  }),
  middleware: (getDefaultMiddleware) =>
    // Adding the API middleware to the default middleware chain
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

export const { useGetPizzasQuery, useCreatePizzaMutation } = pizzaApi;
