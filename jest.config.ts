module.exports = {
    modulePaths: ['src'],
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.svg': '<rootDir>/src/__mocks__/fileMock.ts',
    },
};
