module.exports = {
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx"
  ],
  collectCoverage: true,
  collectCoverageFrom: [ 'components/**/*.ts', 'components/**/*.tsx'],
  verbose: false,
  globals: {
    "NODE_ENV": "test",
  },
  transform: {
     "^.+\\.(t|j)sx?$": "babel-jest"
  },
  setupFiles: ["<rootDir>/test/setup.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/test/filemock.js"
  },
  bail: true,
  // coverageThreshold: {
  //   global: {
  //     statements: "90"
  //   }
  // }
};