import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError, ITrack, ITrackHistory, TrackHistoryMutation } from "../../types";
import { RootState } from "../../app/store";
import { isAxiosError } from "axios";
import axiosApi from "../../axiosApi";

export const getTrackHistory = createAsyncThunk<ITrackHistory[], void, {state: RootState}>(
    'trackHistory/fetch',
    async(_arg, {getState})=>{
        const token = getState().users.user?.token;
        const {data: tracks} = await axiosApi.get(`/track_history`, {headers: {Authorization: `Bearer ${token}`}})
        return tracks;
    },
);

export const fetchTrack = createAsyncThunk<ITrack, string>('track/fetchAll', async (id) => {
    const { data: tracks } = await axiosApi.get<ITrack>(`/tracks/${id}`);
    return tracks;
  });


export const trackHistory = createAsyncThunk<ITrackHistory, TrackHistoryMutation, {rejectValue: GlobalError, state: RootState}>(
    'trackHistory/post',
    async(trackHistoryMutation, {getState, rejectWithValue})=>{
        try{
            const user = getState().users.user;
            if (user) {
                const {data: tracks} = await axiosApi.post('/track_history', trackHistoryMutation, {headers: {'Authorization': `Bearer ${user.token}`}})
                return tracks;
            }
        }catch(e){
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data)
            }

            throw e;
        }
    }
)
