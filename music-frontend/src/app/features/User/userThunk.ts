import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import { isAxiosError } from "axios";
import {
  IUser,
  LoginMutation,
  RegisterMutation,
  ValidationError,
  GlobalError,
} from "../../../types";

export const register = createAsyncThunk<
  IUser,
  RegisterMutation,
  { rejectValue: ValidationError }
>("user/register", async (registerMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<IUser>(
      "/user",
      registerMutation
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  IUser,
  LoginMutation,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<IUser>(
      "/user/sessions",
      loginMutation
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
