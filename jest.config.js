module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).{js,jsx}'],
  setupFiles: [
    '<rootDir>/config/polyfills.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
  ],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};
