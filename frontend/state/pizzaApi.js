import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza' }),
  endpoints: (builder) => ({
    getPizzas: builder.query({
      query: () => '/history',
    }),
  }),
  middleware: getDefaultMiddleware =>
    // Adding the API middleware to the default middleware chain
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

export const { useGetPizzasQuery } = pizzaApi;