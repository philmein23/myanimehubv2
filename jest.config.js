module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|sass|jpg|png)$": "<rootDir>/empty-module.js",
    "^@bundles(.*)$": "<rootDir>/bundles$1",
    "^@pages(.*)$": "<rootDir>/pages$1",
    "^@util(.*)$": "<rootDir>/util$1",
  },
};
