import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IProducts} from "./types";


const API_URL = 'https://fakestoreapi.com/products'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProducts[], null>({
            query: () => '/',
        }),
        // getCategories: builder.query<IProducts[], string>({
        //     query: (category) => `/category${category}`,
        // }),
    }),
})

export const { useGetAllProductsQuery} = productsApi