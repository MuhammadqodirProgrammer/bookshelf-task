import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './rtk-query/productApi';

export const store = configureStore({
	reducer: {
		// usersCrud: usersCrudSlice,
		// rtk query uchun  keyni ozini ichidagi reducerPath ni berish maslahat beriladi
		[productsApi.reducerPath]: productsApi.reducer,
	},
	//  productsApi ishlatish uchun middleware berish shart bolmasa hato beradi
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
});
