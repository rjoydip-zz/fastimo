"use strict";

const readline = require("readline");
const { echo } = require("shelljs");

/**
 * simple CLI prompt module - with the emphasis on simple and non-invasive
 * with command history and command completion
 */
module.exports = () => {
  let rl;
  let commands;

  function $$completer(line) {
    const ml1 = [];
    const ml2 = [];
    const s = line.split(" ");
    const keys = Object.keys(commands);
    let command = null;
    let result;

    // if more than one token
    if (s.length > 0) {
      // check for exact $$match
      keys.forEach(key => {
        if (key === s[0]) {
          command = key;
        }
      });

      // if exact match check sub command entries
      if (command) {
        if (commands[command].sub) {
          commands[command].sub.forEach(sub => {
            if (sub.indexOf(s[1]) === 0) {
              ml2.push(`${command} ${sub}`);
            }
          });

          // no sub match so return all possibilities
          if (ml2.length === 0) {
            commands[command].sub.forEach(sub => {
              ml2.push(`${command} ${sub}`);
            });
          }

          result = [ml2, line];
        } else {
          result = [[], line];
        }
      }
    }

    // command not matched
    if (!command) {
      keys.forEach(key => {
        if (key.indexOf(s[0]) === 0) {
          ml1.push(key);
        }
      });
      result = [ml1.length ? ml1 : keys, line];
    }
    return result;
  }

  function $$match(line) {
    let $line = line;
    const keys = Object.keys(commands);
    let command = null;
    let args = null;
    let s = null;

    $line = $line.trim();
    $line = $line.replace(/\s+/g, " ");
    s = $line.split(" ");

    keys.forEach(key => {
      if (key === s[0]) {
        command = commands[key];
        s.shift();
        args = s;
      }
    });
    return { command, args };
  }

  function prompt(prmpt = "> ", cmds) {
    commands = cmds;

    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      historySize: 50,
      $$completer,
      prompt: prmpt,
    });

    rl.on("line", line => {
      if (line === ".exit" || line === "exit") {
        return rl.close();
      }
      const result = $$match(line);
      if (result.command) {
        result.command.action(result.args, quit => (quit ? close() : display()));
      } else {
        echo("invalid command");
        rl.prompt();
      }
    });

    return this;
  }

  function display() {
    rl.prompt();
    return this;
  }

  function close() {
    rl.close();
    return this;
  }

  return {
    prompt,
    close,
    display,
  };
};
