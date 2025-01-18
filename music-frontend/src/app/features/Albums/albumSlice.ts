import { createSlice } from "@reduxjs/toolkit";
import { IAlbum } from "../../../types";
import { fetchAlbums } from "./albumThunk";
interface AlbumsState {
  items: IAlbum[];
  oneAlbum: IAlbum | null;
  albumFetching: boolean;
  itemsFetching: boolean;
}
const initialState: AlbumsState = {
  items: [],
  oneAlbum: null,
  albumFetching: false,
  itemsFetching: false,
};
export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.itemsFetching = false;
        state.items = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.itemsFetching = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.items,
    selectLoad: (state) => state.itemsFetching,
  },
});
export const albumsReducer = albumsSlice.reducer;
export const { selectAlbums, selectLoad } = albumsSlice.selectors;
