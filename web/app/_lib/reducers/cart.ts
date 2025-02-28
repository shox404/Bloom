import { createSlice } from "@reduxjs/toolkit";
import { PayloadMsg, Product } from "@/app/types";
import { message } from "antd";
import { loginAdmin } from "../services/admin";

type State = { cart: Product[] };

const initialState: State = {
  cart: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    HANDLE_TO_CART: (state, { payload }) => {
      if (state.cart.some((e) => e.id == payload.id)) {
        const index = state.cart.findIndex((e) => e.id == payload.id);
        state.cart.splice(index, 1);
      } else {
        state.cart.push({ ...payload, amount: 1 });
      }
    },
    ADD_COUNT: (state, { payload }) => {
      const index = state.cart.findIndex((e) => e.id == payload);
      state.cart[index].amount += 1;
    },
    REMOVE_COUNT: (state, { payload }) => {
      const index = state.cart.findIndex((e) => e.id == payload);
      state.cart[index].amount -= 1;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      loginAdmin.matchFulfilled,
      (_, { payload }: PayloadMsg) => {
        message.success(payload.msg);
      }
    );
  },
});

export const { HANDLE_TO_CART, ADD_COUNT, REMOVE_COUNT } = cart.actions;
export default cart.reducer;
