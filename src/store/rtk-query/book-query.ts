import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
  id: number;
  title: string;
  author: string;
  status: string; // e.g., "Read", "Reading", "To Read"
}


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://no23.lavina.tech:' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),
    addBook: builder.mutation({
      query: (bookData: Book) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
    }),
    editBookStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: 'DELETE',
      }),
    }),
    getAllBooks: builder.query({
      query: () => '/books',
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAddBookMutation,
  useEditBookStatusMutation,
  useDeleteBookMutation,
  useGetAllBooksQuery,
} = api;