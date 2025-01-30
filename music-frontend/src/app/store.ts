import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/Artists/artistsSlice';
import { albumsReducer } from '../features/Albums/albumsSlice';
import { tracksReducer } from '../features/Tracks/tracksSlice';
import { userReducer } from '../features/User/userSlice';
import { trackHistoryReducer } from '../features/TrackHistory/trackHistorySlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(usersPersistConfig, userReducer),
  trackHistory: trackHistoryReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=>{
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
  }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;