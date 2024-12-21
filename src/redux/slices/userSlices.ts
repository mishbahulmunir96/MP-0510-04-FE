import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  address: string;
  profilePicture: string;
  token: string;
}

const initialState: UserState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "",
  birthDate: "",
  address: "",
  profilePicture: "",
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
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.birthDate = action.payload.birthDate;
      state.address = action.payload.address;
      state.profilePicture = action.payload.profilePicture;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.phoneNumber = "";
      state.gender = "";
      state.birthDate = "";
      state.address = "";
      state.profilePicture = "";
      state.token = "";
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
