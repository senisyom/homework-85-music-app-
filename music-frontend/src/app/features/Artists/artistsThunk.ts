import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import { IArtist } from "../../../types";
export const fetchArtists = createAsyncThunk<IArtist[]>(
  "artists/fetchAll",
  async () => {
    const { data: artists } = await axiosApi.get<IArtist[]>("/artists");
    return artists;
  }
);
export const fetchArtist = createAsyncThunk<IArtist, string>(
  "artist/fetchOne",
  async (id) => {
    const { data: artist } = await axiosApi.get<IArtist>(`/artists/${id}`);
    return artist;
  }
);
