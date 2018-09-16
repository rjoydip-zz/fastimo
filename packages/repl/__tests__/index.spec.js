"use strict";

const repl = require("../index")();

test("test repl module", () => expect(typeof repl).toBe("object"));
test("test repl display instance", () => expect(typeof repl.prompt("> ", []).display()).toBe("object"));
test("test repl without display instance", () => expect(typeof repl.prompt("> ", [])).toBe("object"));
