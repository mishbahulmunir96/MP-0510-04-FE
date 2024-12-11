import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

const initialState: UserState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
