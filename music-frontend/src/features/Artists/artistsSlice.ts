import { createSlice } from "@reduxjs/toolkit";
import { IAlbum, IArtist } from "../../types";
import { createArtist, deleteArtist, fetchArtist, fetchArtists, publishArtist } from "./artistsThunk";

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
}

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
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
            })
            .addCase(createArtist.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(createArtist.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(createArtist.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(publishArtist.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(publishArtist.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(publishArtist.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(deleteArtist.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(deleteArtist.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(deleteArtist.rejected, (state) => {
                state.itemsFetching = false;
            });
    },
    selectors: {
        selectArtists: (state)=>state.items,
        selectOneArtist: (state)=>state.oneArtist,
        selectLoadArtist: (state)=>state.itemsFetching,
        selectArtist: (state)=>state.oneArtist,
    }
})

export const artistsReducer = artistsSlice.reducer;

export const {
    selectArtists,
    selectLoadArtist,
    selectOneArtist,
    selectArtist,
  } = artistsSlice.selectors;