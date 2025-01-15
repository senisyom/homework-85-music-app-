import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import { IArtist } from "../../../types";
export const fetchArtists = createAsyncThunk("artists/fetchAll", async () => {
  const { data: artists } = await axiosApi.get<IArtist[]>("/artists");
  return artists;
});
