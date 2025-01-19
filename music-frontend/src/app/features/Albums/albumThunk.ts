import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import { IAlbum } from "../../../types";
export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  "albums/fetchAll",
  async (idArtist) => {
    const { data: albums } = await axiosApi.get<IAlbum[]>(
      `/artistAlbums/${idArtist}`
    );
    return albums;
  }
);
export const fetchAlbum = createAsyncThunk<IAlbum, string>(
  "albums/fetchOne",
  async (id) => {
    const { data: album } = await axiosApi.get<IAlbum>(`/albums/${id}`);
    return album;
  }
);
