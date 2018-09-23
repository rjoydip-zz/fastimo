"use strict";

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["{core}/**/*.spec.js", "{modules}/**/*.spec.js"],
  modulePathIgnorePatterns: ["/__fixtures__/"],
  roots: ["<rootDir>/core", "<rootDir>/modules"],
  testEnvironment: "node",
  testRunner: "jest-circus/runner",
};
