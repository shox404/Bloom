import users from "@/app/_lib/reducers/users";
import products from "@/app/_lib/reducers/products";
import admin from "@/app/_lib/reducers/admin";
import category from "@/app/_lib/reducers/category";
import cart from "@/app/_lib/reducers/cart";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users,
    products,
    admin,
    category,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
