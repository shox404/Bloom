import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../services/users";

type State = { user: any };

const initialState: State = { user: {} };

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    // EQUAL_USER: (state, { payload }: { payload: Detail }) => {
    //   state.item = { ...state.item, [payload.key]: payload.value };
    // },
  },
  extraReducers(builder) {
    builder.addMatcher(getUser.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const {} = users.actions;
export default users.reducer;
