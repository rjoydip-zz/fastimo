"use strict";

const fn = require("../index");

test("test app module", () => expect(typeof fn).toBe("function"));