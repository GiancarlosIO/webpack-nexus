/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  // transformIgnorePatterns: ['node_modules/.pnpm/(?!ora|chalk)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default jestConfig;
