"use strict";

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["{packages}/**/*.js"],
  modulePathIgnorePatterns: ["/__fixtures__/"],
  roots: ["<rootDir>/packages"],
  testEnvironment: "node",
  testRunner: "jest-circus/runner",
};
