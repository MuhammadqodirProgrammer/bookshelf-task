import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = 'https://my-blog-api-nine.vercel.app/api';


export const productsApi = createApi({
	// reducerPath ga ihtiyoriy nom
	reducerPath: 'productsApi',
	tagTypes: ['News'],
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	// endpoints ozida funksiya oladini va obekt return qiladi
	endpoints: (builder) => ({
		getProducts: builder.query({
			// bu yerga base userlan kiyingi qaysi joyga zapros jonashishni aytamiz masalan /user yoki /todo va boshqalar bizdahozircha / ni ozi
			query: () => `/news`,
			providesTags: (result) => {
				console.log(result, 'res');
				return result ? result.map((el:any) => ({ type: 'News' })) : [];
				// return result ? result.map(({ id }) => ({ type: 'News', id })) : [];
			},
		}),
		addProducts: builder.mutation({
			query: (data) => {
				return {
					url: `/news`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['News'],
		}),

        deleteProducts: builder.mutation({
			query: (id) => {
				return {
					url: `/news/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: ['News'],
		}),
	}),
});

// yani bu endpoints ni ichidagi fulksiyalarni bizga hook qilib beradi ajoyib
export const { useGetProductsQuery, useAddProductsMutation, useDeleteProductsMutation } = productsApi;
