import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Params } from './models/product'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ sort, category }: Params) => ({
        url: !category ? 'products' : `products/category/${category}`,
        params: {
          limit: 20,
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
