/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  testPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/tests/fixtures'],
  // transformIgnorePatterns: ['node_modules/.pnpm/(?!ora|chalk)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

module.exports = jestConfig;
