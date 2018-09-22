"use strict";

const repl = require(".")();

function hello(args, cb) {
  cb(false);
}

function goodbye(args, cb) {
  cb(true);
}

const commands = {
  hello: {
    action: hello,
  },

  goodbye: {
    action: goodbye,
  },
};

repl.prompt("> ", commands).display();
