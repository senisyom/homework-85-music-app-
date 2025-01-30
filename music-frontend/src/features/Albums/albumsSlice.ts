import { createSlice } from "@reduxjs/toolkit";
import { IAlbum } from "../../types";
import { createAlbum, deleteAlbum, fetchAlbum, fetchAlbums, publishAlbum } from "./albumsThunk";


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
}

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
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
            })
            .addCase(fetchAlbum.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchAlbum.fulfilled, (state, { payload: album }) => {
                state.itemsFetching = false;
                state.oneAlbum = album;
            })
            .addCase(fetchAlbum.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(createAlbum.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(createAlbum.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(createAlbum.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(publishAlbum.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(publishAlbum.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(publishAlbum.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(deleteAlbum.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(deleteAlbum.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(deleteAlbum.rejected, (state) => {
                state.itemsFetching = false;
            })
    },
    selectors: {
        selectAlbums: (state)=>state.items,
        selectOneAlbum: (state)=>state.oneAlbum,
        selectLoad: (state)=>state.itemsFetching,
    }
})

export const albumsReducer = albumsSlice.reducer;

export const {
    selectAlbums,
    selectLoad,
    selectOneAlbum,
  } = albumsSlice.selectors;