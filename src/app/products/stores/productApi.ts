import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: 'products',
      }),
      transformResponse: (response) => {
        return response.products
      },
    }),
    getCategories: build.query({
      query: () => ({
        url: 'products/categories',
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
} = productApi
