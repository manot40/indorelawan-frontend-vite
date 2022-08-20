const swcConfig = {
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true,
    },
    transform: {
      react: {
        runtime: 'automatic',
      },
      hidden: {
        jest: true,
      },
    },
  },
  module: {
    type: 'commonjs',
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
const jest = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  testMatch: ['**/?(*.)(spec|test).js?(x)'],
  moduleNameMapper: { '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy' },
  setupFilesAfterEnv: ['./jest/setup.js'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/*.stories.js'],
  transform: {
    '^.+\\.js$': ['@swc/jest', swcConfig],
    '^.+\\.css$': '<rootDir>/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 20,
      functions: 20,
      lines: 20,
    },
  },
  moduleFileExtensions: ['tsx', 'ts', 'web.js', 'js', 'web.ts', 'web.tsx', 'json', 'web.jsx', 'jsx', 'node'],
};

module.exports = jest;
