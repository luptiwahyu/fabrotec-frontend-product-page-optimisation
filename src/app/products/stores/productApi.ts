import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: (sort: string) => ({
        url: 'products',
        params: {
          limit: 10,
          sortBy: 'price',
          order: sort,
        },
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
