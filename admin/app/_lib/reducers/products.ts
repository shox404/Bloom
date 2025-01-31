import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../services/products";
import { Detail, Product } from "@/app/types";

type State = {
  product: Product;
  edit: Product;
  products: Product[];
  productsAmount: {};
};

const productSchema: Product = {
  image: "",
  title: "",
  price: 0,
  active: false,
  category: "",
};

const initialState: State = {
  product: productSchema,
  edit: productSchema,
  products: [],
  productsAmount: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    EQUAL_PRODUCT: (state, { payload }: { payload: Detail }) => {
      state.product = { ...state.edit, [payload.name]: payload.value };
    },
    SET_EDIT: (state, { payload }: { payload: any }) => {
      state.edit = payload;
    },
    EQUAL_EDIT: (state, { payload }: { payload: Detail }) => {
      state.edit = { ...state.edit, [payload.name]: payload.value };
    },
    CLEAR_PRODUCT: (state) => {
      state.product = initialState.product;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(createProduct.matchFulfilled, (state, { payload }) => {
        state.products.push(payload);
      })
      .addMatcher(getProducts.matchFulfilled, (state, { payload }) => {
        state.products = payload;

        // const ctg = Array.from(new Set(payload.map((e) => e.category)));

        // state.productsAmount = ctg.map((item: string) => ({
        //   title: item,
        //   amount: payload.reduce((acc: number, e: Product) => {
        //     if (item == e.category) acc += +e.amount;
        //     return acc;
        //   }, 0),
        // }));
      })
      .addMatcher(editProduct.matchFulfilled, (state, { payload }) => {
        state.products.map((item, index) => {
          if (payload.id == item.id) state.products.splice(index, 1, payload);
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
