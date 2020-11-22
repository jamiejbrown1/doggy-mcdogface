import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as DogApi from '../../api/DogApi';
import { RootState } from '../../app/store';

export const getBreedImages = createAsyncThunk<BreedImages, BreedImagesRequest>(
    'breedImages/getBreedImages',
    async ({ breed, count }, { rejectWithValue }) => {
        try {
            const images = await DogApi.getRandomBreedImages(breed, count);
            return { [breed]: images };
        } catch (err) {
            return rejectWithValue(err);
        }
    },
    {
        condition({ breed, refresh }, { getState }): boolean {
            if (refresh) {
                return true;
            }
            const { breedImages } = getState() as { breedImages: BreedImagesState };
            return !breedImages.breeds || !breedImages.breeds[breed];
        },
    },
);

export interface BreedImagesRequest {
    breed: string;
    count: number;
    refresh?: boolean;
}

export interface BreedImages {
    [key: string]: string[];
}

interface BreedImagesState {
    breeds: BreedImages;
    loading: boolean;
    error: Error;
}

const initialState: BreedImagesState = {
    breeds: {},
    loading: false,
    error: null,
};

export const breedImagesSlice = createSlice({
    name: 'breedImages',
    initialState,
    reducers: {},
    extraReducers: {
        [getBreedImages.pending.type]: (state) => {
            state.loading = true;
        },
        [getBreedImages.fulfilled.type]: (state, { payload }) => {
            state.loading = false;
            state.breeds = { ...state.breeds, ...payload };
        },
        [getBreedImages.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const selectBreedImages = (state: RootState): BreedImagesState => state.breedImages;

export default breedImagesSlice;
