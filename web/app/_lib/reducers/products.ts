import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/app/types";

type State = { products: Product[] };

const initialState: State = { products: [] };

const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addMatcher(
    //   getUserByPhone.matchFulfilled,
    //   (state, { payload }: { payload: Product }) => {
    //     state.user = payload;
    //   }
    // );
  },
});

export const {} = products.actions;
export default products.reducer;
