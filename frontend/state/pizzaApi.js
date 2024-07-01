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
    createPizza: build.mutation({
      query: (order) => ({
        url: "/order",
        body: order,
        method: "POST",
      }),
      invalidatesTags: ["Pizza"],
    }),
  }),
  middleware: (getDefaultMiddleware) =>
    // Adding the API middleware to the default middleware chain
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

export const { useGetPizzasQuery, useCreatePizzaMutation } = pizzaApi;
