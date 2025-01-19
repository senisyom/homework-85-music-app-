import { createSlice } from "@reduxjs/toolkit";
import { ITrack } from "../../../types";
import { fetchTracks } from "./trackThunk";
interface TracksState {
  items: ITrack[];
  itemsFetching: boolean;
}
const initialState: TracksState = {
  items: [],
  itemsFetching: false,
};
export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.itemsFetching = false;
        state.items = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.itemsFetching = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.items,
    selectLoad: (state) => state.itemsFetching,
  },
});
export const tracksReducer = tracksSlice.reducer;
export const { selectTracks, selectLoad } = tracksSlice.selectors;
