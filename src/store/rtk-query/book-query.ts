import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from 'api/base-DTO';
const md5 = require('md5')



const token = localStorage.getItem('book-token')
let keys;

if (token) {
  keys = JSON.parse(token || '')
}

export const bookApi = createApi({
  reducerPath: 'bookApi',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://no23.lavina.tech', headers: {
      Key: keys?.key,
      Sign: md5("get"?.toUpperCase() + "/myself" + keys?.secret)
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),
    addBook: builder.mutation({
      query: (bookData: {isbn:string}) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
    }),

    editBookStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
    getAllBooks: builder.query({
      query: () => '/books',
      providesTags: (result) => {
        console.log(result, 'res');
        return result ? result.map((el: any) => ({ type: 'Books', el })) : [];
        // return result ? result.map(({ id }) => ({ type: 'News', id })) : [];
      },
    }),
    getMySelf: builder.query({
      query: () => '/myself',
      providesTags: (result) => {
        console.log(result, 'res my selg');
        return result ? result.map((el: any) => ({ type: 'Books', el })) : [];
        // return result ? result.map(({ id }) => ({ type: 'News', id })) : [];
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAddBookMutation,
  useEditBookStatusMutation,
  useDeleteBookMutation,
  useGetAllBooksQuery,
  useGetMySelfQuery,
} = bookApi;