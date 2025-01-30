import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ITrack, TrackMutation } from '../../types';

export const fetchTracks = createAsyncThunk<ITrack[], string>('tracks/fetchAll', async (idAlbum) => {
  const { data: tracks } = await axiosApi.get<ITrack[]>(`/tracks/album/${idAlbum}`);
  return tracks;
});

export const createTrack = createAsyncThunk<void, TrackMutation>('tracks/create', async (trackMutation) => {
  await axiosApi.post<ITrack>('/tracks', trackMutation);
});

export const publishTrack = createAsyncThunk<ITrack, string>('tracks/publish', async (id) => {
  const {data: track} = await axiosApi.patch<ITrack>(`/tracks/${id}/togglePublished`);
  return track;
});

export const deleteTrack = createAsyncThunk<ITrack, string>('tracks/delete', async (id) => {
  const {data: track} = await axiosApi.delete<ITrack>(`/tracks/${id}`);
  return track;
});