import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as DogApi from '../../api/DogApi';
import { RootState } from '../../app/store';
import { Breed } from '../../globals';

export const getDogBreeds = createAsyncThunk(
    'dogs/getDogBreeds',
    async (_, { rejectWithValue }) => {
        try {
            return await DogApi.getBreeds();
        } catch (err) {
            return rejectWithValue(err);
        }
    },
    {
        condition(_, { getState }): boolean {
            const { dogs } = getState() as { dogs: DogsState };
            return !dogs.breeds || !dogs.breeds.length;
        },
    },
);

type DogsState = {
    breeds: Breed[];
    loading: boolean;
    error: Error;
};

const initialState: DogsState = {
    breeds: [],
    loading: true,
    error: null,
};

export const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {},
    extraReducers: {
        [getDogBreeds.pending.type]: (state) => {
            state.loading = true;
        },
        [getDogBreeds.fulfilled.type]: (state, { payload }) => {
            state.loading = false;
            state.breeds = payload;
        },
        [getDogBreeds.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const selectDogs = (state: RootState): DogsState => state.dogs;

export default dogsSlice;
