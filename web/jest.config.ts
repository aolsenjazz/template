import path from 'path';

import type { Config } from 'jest';

const config: Config = {
  rootDir: path.resolve(__dirname),
  preset: 'ts-jest',
  testMatch: ['<rootDir>/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};

export default config;
