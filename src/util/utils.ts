import { Breed } from '../globals';

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const filterBreeds = (breeds: Breed[], search: string): Breed[] => {
    if (!search) {
        return breeds;
    }
    return breeds.filter(({ name }) => name.toLocaleLowerCase().includes(search));
};
