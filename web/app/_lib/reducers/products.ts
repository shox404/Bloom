import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/app/types";
import { Detail } from "@/app/global/types";

type State = { product: Product; editProduct: Product; products: Product[] };

const initialState: State = {
  product: {
    title: "",
    image: "",
    price: 0,
    category: "",
  },
  editProduct: {
    title: "",
    image: "",
    price: 0,
    category: "",
  },
  products: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    EQUAL_PRODUCT: (state, { payload }: { payload: Detail }) => {
      state.product = { ...state.product, [payload.key]: payload.value };
    },
    SET_EDIT: (state, { payload }: { payload: any }) => {
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
    // builder.addMatcher(
    //   getUserByPhone.matchFulfilled,
    //   (state, { payload }: { payload: Product }) => {
    //     state.user = payload;
    //   }
    // );
  },
});

export const { EQUAL_PRODUCT, CLEAR_PRODUCT, SET_EDIT, EQUAL_EDIT } =
  products.actions;
export default products.reducer;
