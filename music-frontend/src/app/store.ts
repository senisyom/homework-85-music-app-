import { configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "./features/Artists/artistsSlice";
import { albumsReducer } from "./features/Albums/albumSlice";
import { tracksReducer } from "./features/Tracks/trackSlice";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
