import { createSlice } from "@reduxjs/toolkit";
import { getUserByPhone } from "../services/users";
import { User } from "@/app/types";

type State = { user: User };

const initialState: State = { user: {
  location: {
    latitude: 0,
    longitude: 0
  },
  name: "",
  phone_number: "",
  tg_data: {
    id: 0,
    username: ""
  }
} };

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
