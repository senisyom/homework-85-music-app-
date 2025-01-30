import { createSlice } from "@reduxjs/toolkit";
import { ITrack, ITrackHistory } from "../../types";
import { fetchTrack, getTrackHistory, trackHistory } from "./trackHistoryThunk";

interface TrackHistoryState {
    tracks: ITrackHistory[];
    trackHistoryLoading: boolean;
    tracksFromHistory: ITrack[];
}

const initialState:TrackHistoryState = {
    tracks: [],
    trackHistoryLoading: false,
    tracksFromHistory: [],
}

export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(trackHistory.pending , (state)=>{
            state.trackHistoryLoading = true;
        })
        .addCase(trackHistory.fulfilled, (state)=>{
            state.trackHistoryLoading = false;
        })        
        .addCase(trackHistory.rejected, (state)=>{
            state.trackHistoryLoading = false;
        })
        .addCase(getTrackHistory.pending , (state)=>{
            state.trackHistoryLoading = true;
        })
        .addCase(getTrackHistory.fulfilled, (state, {payload: tracks})=>{
            state.tracks = tracks;
            state.trackHistoryLoading = false;
        })        
        .addCase(getTrackHistory.rejected, (state)=>{
            state.trackHistoryLoading = false;
        })
        .addCase(fetchTrack.pending , (state)=>{
            state.trackHistoryLoading = true;
        })
        .addCase(fetchTrack.fulfilled, (state, {payload: track})=>{
            state.tracksFromHistory.push(track);
            state.trackHistoryLoading = false;
        })        
        .addCase(fetchTrack.rejected, (state)=>{
            state.trackHistoryLoading = false;
        })
    },
    selectors: {
        selectTrackHistory: state=>state.tracks,
        selectTrackHistoryLoading: state=>state.trackHistoryLoading,
        selectTracksFromHistory: state=>state.tracksFromHistory,
    }
})

export const {selectTrackHistory, selectTrackHistoryLoading, selectTracksFromHistory} = trackHistorySlice.selectors;

export const trackHistoryReducer = trackHistorySlice.reducer;