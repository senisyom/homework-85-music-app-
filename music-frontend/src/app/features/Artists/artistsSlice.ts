import { createSlice } from "@reduxjs/toolkit";
import { IAlbum, IArtist } from "../../../types";
import { fetchArtist, fetchArtists } from "./artistsThunk";

interface ArtistsState {
  items: IArtist[];
  oneArtist: IArtist | null;
  artistAlbums: IAlbum[];
  artistFetching: boolean;
  itemsFetching: boolean;
}

const initialState: ArtistsState = {
  items: [],
  oneArtist: null,
  artistAlbums: [],
  artistFetching: false,
  itemsFetching: false,
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.rejected, (state) => {
        state.itemsFetching = false;
      })
      .addCase(fetchArtist.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchArtist.fulfilled, (state, { payload: artist }) => {
        state.itemsFetching = false;
        state.oneArtist = artist;
      })
      .addCase(fetchArtist.rejected, (state) => {
        state.itemsFetching = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.items,
    selectLoad: (state) => state.itemsFetching,
    selectArtist: (state) => state.oneArtist,
  },
});
export const artistsReducer = artistsSlice.reducer;
export const { selectArtists, selectLoad, selectArtist } =
  artistsSlice.selectors;
