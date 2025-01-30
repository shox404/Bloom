import { createSlice } from "@reduxjs/toolkit";
import { getUserByPhone } from "../services/users";
import { User } from "@/app/types";

type State = { user: any };

const initialState: State = { user: {} };

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      getUserByPhone.matchFulfilled,
      (state, { payload }: { payload: User }) => {
        state.user = payload;
      }
    );
  },
});

export const {} = users.actions;
export default users.reducer;
