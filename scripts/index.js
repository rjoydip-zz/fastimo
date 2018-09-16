"use strict";

const shell = require("shelljs");
const args = require("yargs-parser")(process.argv.slice(2));
const generate = require("./generate");

const argsParse = obj => {
  delete obj._;
  return obj;
};

if (args._.length > 0) {
  if (args._.indexOf("generate") > -1 || args._.indexOf("gen") > -1 || args._.indexOf("g") > -1) {
    if (Object.keys(argsParse(args)).length > 0) {
      module.exports = generate(argsParse(args));
    } else {
      shell.echo("No argument passed");
    }
  } else {
    shell.echo("Invalid command");
  }
} else {
  shell.echo("No argument passed");
}
