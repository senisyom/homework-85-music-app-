import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import { ITrack } from "../../../types";
export const fetchTracks = createAsyncThunk<ITrack[], string>(
  "tracks/fetchAll",
  async (idAlbum) => {
    const { data: tracks } = await axiosApi.get<ITrack[]>(`/tracks/${idAlbum}`);
    return tracks;
  }
);
