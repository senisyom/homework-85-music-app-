import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { AlbumMutation, IAlbum } from '../../types';
import { RootState } from '../../app/store';

export const fetchAlbums = createAsyncThunk<IAlbum[]>('albums/fetchAll', async () => {
  const { data: albums } = await axiosApi.get<IAlbum[]>('/albums');
  return albums;
});

export const fetchAlbum = createAsyncThunk<IAlbum, string>('albums/fetchOne', async (id) => {
    const { data: album } = await axiosApi.get<IAlbum>(`/albums/${id}`);
    return album;
});

export const createAlbum = createAsyncThunk<void, AlbumMutation, {state: RootState}>('albums/create',  async (albumMutation, {getState}) => {
  const user = getState().users.user;
  const formData = new FormData();
  if (user) {    
    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value) {
        formData.append(key, value);
      }
    });
    await axiosApi.post<IAlbum>(`/albums`, formData, {headers: {'Authorization': `Bearer ${user.token}`}});
  }
});

export const publishAlbum = createAsyncThunk<IAlbum, string>('albums/publish', async (id) => {
  const { data: album } = await axiosApi.patch<IAlbum>(`/albums/${id}/togglePublished`);
  return album;
});

export const deleteAlbum = createAsyncThunk<IAlbum, string>('albums/delete', async (id) => {
  const { data: album } = await axiosApi.delete<IAlbum>(`/albums/${id}`);
  return album;
});