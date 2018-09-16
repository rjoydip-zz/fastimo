const welcome = require("@fastlib/core");

test("core welcome method", () => {
  expect(typeof welcome).toBe("function");
});

test("welcome message", () => {
  expect(welcome()).toEqual("Welcome to fastlib");
});
