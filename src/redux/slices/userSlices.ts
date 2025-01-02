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
  role: string;
  token: string;
  referralCode: string;
  point: number;
  referrals: {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: string;
  }[];
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
  role: "",
  token: "",
  referralCode: "",
  point: 0,
  referrals: [],
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
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.referralCode = action.payload.referralCode;
      state.point = action.payload.point;
      state.referrals = action.payload.referrals;
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
      state.role = "";
      state.token = "";
      state.referralCode = "";
      state.point = 0;
      state.referrals = [];
    },
    updateUserAction: (state, action: PayloadAction<Partial<UserState>>) => {
      const {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        birthDate,
        address,
        profilePicture,
      } = action.payload;
      if (id !== undefined) state.id = id;
      if (firstName !== undefined) state.firstName = firstName;
      if (lastName !== undefined) state.lastName = lastName;
      if (email !== undefined) state.email = email;
      if (phoneNumber !== undefined) state.phoneNumber = phoneNumber;
      if (gender !== undefined) state.gender = gender;
      if (birthDate !== undefined) state.birthDate = birthDate;
      if (address !== undefined) state.address = address;
      if (profilePicture !== undefined) state.profilePicture = profilePicture;
    },
  },
});

export const { loginAction, logoutAction, updateUserAction } =
  userSlice.actions;
export default userSlice.reducer;
