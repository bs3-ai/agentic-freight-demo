/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};

module.exports = config;
