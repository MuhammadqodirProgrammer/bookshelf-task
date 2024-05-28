import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from './rtk-query/book-query';
import { productsApi } from './rtk-query/productApi';

export const store = configureStore({
	reducer: {
		// usersCrud: usersCrudSlice,
		// rtk query uchun  keyni ozini ichidagi reducerPath ni berish maslahat beriladi
		[bookApi.reducerPath]: bookApi.reducer,
	},
	//  bookApi ishlatish uchun middleware berish shart bolmasa hato beradi
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(bookApi.middleware),
});
