import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import breedImagesSlice from '../features/breed/breedImagesSlice';
import dogsSlice from '../features/dogs/dogsSlice';

const store = configureStore({
    reducer: {
        dogs: dogsSlice.reducer,
        breedImages: breedImagesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;
