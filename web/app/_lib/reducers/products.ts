import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/app/types";
import { Detail } from "@/app//types";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProductByCategory,
} from "../services/products";

type State = {
  product: Product;
  editProduct: Product;
  products: Product[];
  productsByCategory: Product[];
};

const initialState: State = {
  product: {
    title: "",
    image: "",
    price: 0,
    category: "",
    amount: 1,
  },
  editProduct: {
    title: "",
    image: "",
    price: 0,
    category: "",
    amount: 1,
  },
  products: [],
  productsByCategory: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    EQUAL_PRODUCT: (state, { payload }: { payload: Detail }) => {
      state.product = { ...state.product, [payload.key]: payload.value };
    },
    SET_EDIT: (state, { payload }: { payload: Product }) => {
      state.editProduct = payload;
    },
    EQUAL_EDIT: (state, { payload }: { payload: Detail }) => {
      state.editProduct = {
        ...state.editProduct,
        [payload.key]: payload.value,
      };
    },
    CLEAR_PRODUCT: (state) => {
      state.product = initialState.product;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(getProduct.matchFulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addMatcher(getProductByCategory.matchFulfilled, (state, { payload }) => {
        state.productsByCategory = payload;
      })
      .addMatcher(createProduct.matchFulfilled, (state, { payload }) => {
        state.products.push(payload);
      })
      .addMatcher(editProduct.matchFulfilled, (state, { payload }) => {
        state.products.map((product, index) => {
          if (payload.id == product.id)
            state.products.splice(index, 1, payload);
        });
      })
      .addMatcher(deleteProduct.matchFulfilled, (state, { payload }) => {
        state.products.map((item, index) => {
          if (payload.id == item.id) state.products.splice(index, 1);
        });
      });
  },
});

export const { EQUAL_PRODUCT, CLEAR_PRODUCT, SET_EDIT, EQUAL_EDIT } =
  products.actions;
export default products.reducer;
