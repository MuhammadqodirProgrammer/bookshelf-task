import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book, GetListResponse } from 'api/base-DTO';
const md5 = require('md5')



const token = localStorage.getItem('book-token')

let mykeys: { key: string, secret: string };

if (token) {
  mykeys = JSON.parse(token || '')


}


export const bookApi = createApi({
  reducerPath: 'bookApi',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://no23.lavina.tech',

    // headers: {
    //   Key: keys?.key,
    //   Sign: md5("get"?.toUpperCase() + "/myself" + keys?.secret)
    // },
    // credentials: 'include',
    // prepareHeaders: (headers, getState) => {
    //   const state = getState;
    //   console.log(state, headers, "state headers");

    //   if (token) {
    //     const keys = JSON.parse(token || '')
    //     const sign = md5("get"?.toUpperCase() + "/books" + keys?.secret);
    //     headers.set('Key', `${keys?.key}`);
    //     headers.set('Sign', `${keys?.key}`);
    //   }

    //   return headers;
    // },
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
      query: (bookData: { isbn: string }) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
        headers: {
          "Key": `${mykeys?.key}`,
          "Sign": `${md5("POST" + "/books" + JSON.stringify({ isbn: `${bookData.isbn}` }) + mykeys?.secret)}`
        }
      }),

      invalidatesTags: ['Books'],
    }),

    editBookStatus: builder.mutation({
      query: ({ id, book, status }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: { status, book },
        headers: {
          "Key": `${mykeys?.key}`,
          "Sign": `${md5(`PATCH${'/books/' + id}${book ? JSON.stringify(book) : ''}` + mykeys?.secret)}`
        }
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: 'DELETE',
        headers: {
          "Key": `${mykeys?.key}`,
          "Sign": `${md5("DELETE" + `/books/${bookId}` + mykeys?.secret)}`
        }
      }),
      invalidatesTags: ['Books'],
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: '/books',
        method: 'GET',
        headers: {
          "Key": `${mykeys?.key}`,
          "Sign": `${md5("get".toUpperCase() + "/books" + mykeys?.secret)}`
        }
      }),
      providesTags: (result) => {
        return result?.data ? result?.data?.map((el: any) => ({ type: 'Books', el })) : [];
      },
    }),
    getMySelf: builder.query({
      query: () => ({
        url: '/myself',
        method: 'GET',
        headers: {
          "Key": `${mykeys?.key}`,
          "Sign": `${md5("get".toUpperCase() + "/myself" + mykeys?.secret)}`
        }
      }),
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