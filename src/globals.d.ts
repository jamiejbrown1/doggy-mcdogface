// ensure the additional Jest matchers are available for all test files
import '@testing-library/jest-dom/extend-expect';

export interface Breed {
    name: string;
    subBreeds: string[];
}