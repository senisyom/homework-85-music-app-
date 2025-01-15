import { createSlice } from "@reduxjs/toolkit";
import { IArtist } from "../../../types";
import { fetchArtists } from "./artistsThunk";
interface ArtistsState {
  items: IArtist[];
  itemsFetching: boolean;
}
const initialState: ArtistsState = {
  items: [],
  itemsFetching: false,
};
export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.itemsFetching = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.itemsFetching = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.items,
    selectLoad: (state) => state.itemsFetching,
  },
});
export const artistsReducer = artistsSlice.reducer;
export const { selectArtists, selectLoad } = artistsSlice.selectors;
