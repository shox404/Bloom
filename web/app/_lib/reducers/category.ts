import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategory,
} from "../services/category";
import { Category } from "@/app/types";

type State = { category: Category[]; value: Category };

const initialState: State = { category: [], value: { key: "", image: "" } };

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    SET_CATEGORY: (state, { payload }) => {
      const { key, value } = payload;
      state.value = { ...state.value, [key]: value };
    },
    EMPTY_CATEGORY: (state) => {
      state.value = { key: "", image: "" };
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(getCategory.matchFulfilled, (state, { payload }) => {
        state.category = payload;
      })
      .addMatcher(createCategory.matchFulfilled, (state, { payload }) => {
        state.category.push(payload);
      })
      .addMatcher(editCategory.matchFulfilled, (state, { payload }) => {
        state.category.map((item, index) => {
          if (payload.id == item.id) state.category.splice(index, 1, payload);
        });
      })
      .addMatcher(deleteCategory.matchFulfilled, (state, { payload }) => {
        state.category.map((item, index) => {
          if (payload.id == item.id) state.category.splice(index, 1);
        });
      });
  },
});

export const { SET_CATEGORY, EMPTY_CATEGORY } = category.actions;
export default category.reducer;
