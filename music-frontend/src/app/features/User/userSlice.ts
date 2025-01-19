import { createSlice } from "@reduxjs/toolkit";
import { IUser, ValidationError } from "../../../types";
import { register } from "./userThunk";
interface UserState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}
const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, { payload: user }) => {
        state.registerLoading = false;
        state.user = user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
  },
});
export const userReducer = userSlice.reducer;
export const { selectRegisterError, selectRegisterLoading, selectUser } =
  userSlice.selectors;
