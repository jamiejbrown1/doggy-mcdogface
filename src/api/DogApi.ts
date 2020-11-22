import { Breed } from '../globals';

const LIST_ALL_BREEDS = 'https://dog.ceo/api/breeds/list/all';
const getRandomImagesUrl = (breed, count = 1) =>
    `https://dog.ceo/api/breed/${breed}/images/random/${count}`;

export const getBreeds = async (): Promise<Breed[]> => {
    const response = await fetch(LIST_ALL_BREEDS);
    const { message: breeds } = await response.json();
    return Object.keys(breeds).map(
        (name) =>
            <Breed>{
                name,
                subBreeds: breeds[name],
            },
    );
};

export const getRandomBreedImages = async (breed: string, count: number): Promise<string[]> => {
    const response = await fetch(getRandomImagesUrl(breed, count));
    const { message: images } = await response.json();
    return images;
};
