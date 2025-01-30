import { createSlice } from "@reduxjs/toolkit";
import { ITrack } from "../../types";
import { createTrack, deleteTrack, fetchTracks, publishTrack } from "./trackThunk";


interface TracksState {
    items: ITrack[];
    itemsFetching: boolean;
}

const initialState: TracksState = {
    items: [],
    itemsFetching: false,
}

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
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
            })
            .addCase(createTrack.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(createTrack.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(createTrack.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(deleteTrack.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(deleteTrack.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(deleteTrack.rejected, (state) => {
                state.itemsFetching = false;
            })
            .addCase(publishTrack.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(publishTrack.fulfilled, (state) => {
                state.itemsFetching = false;
            })
            .addCase(publishTrack.rejected, (state) => {
                state.itemsFetching = false;
            })
    },
    selectors: {
        selectTracks: (state)=>state.items,
        selectLoad: (state)=>state.itemsFetching,
    }
})

export const tracksReducer = tracksSlice.reducer;

export const {
    selectTracks,
    selectLoad,
  } = tracksSlice.selectors;