import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Tambahkan ini
  gender: string; // Tambahkan ini
  birthDate: string; // Tambahkan ini
  address: string; // Tambahkan ini
  profilePicture: string; // Tambahkan ini
  token: string;
}

const initialState: UserState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "", // Inisialisasi dengan nilai default
  gender: "", // Inisialisasi dengan nilai default
  birthDate: "", // Inisialisasi dengan nilai default
  address: "", // Inisialisasi dengan nilai default
  profilePicture: "", // Inisialisasi dengan nilai default
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
      state.phoneNumber = action.payload.phoneNumber; // Tambahkan ini
      state.gender = action.payload.gender; // Tambahkan ini
      state.birthDate = action.payload.birthDate; // Tambahkan ini
      state.address = action.payload.address; // Tambahkan ini
      state.profilePicture = action.payload.profilePicture; // Tambahkan ini
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.phoneNumber = ""; // Reset ini
      state.gender = ""; // Reset ini
      state.birthDate = ""; // Reset ini
      state.address = ""; // Reset ini
      state.profilePicture = ""; // Reset ini
      state.token = "";
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
