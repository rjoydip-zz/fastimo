const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const { html } = require("common-tags");

const dir = path.dirname(__dirname);
const pkgsDir = path.join(dir, "packages");
const modDir = path.join(dir, "modules");
shell.config.silent = true;

const generate = (_dir, name) => {
  const $dir = _dir;
  try {
    shell.mkdir(path.join($dir, name)); // create a directory
    shell.mkdir(path.join($dir, name, "__tests__")); //  create __directory
    shell.cd(`${path.join($dir, name)}`).exec("npm init -y");
    fs.writeFileSync(
      `${path.join($dir, name)}\\index.js`,
      html`
      "use strict";

      module.exports = () => "Welcome ${name}";

    `,
      "utf-8"
    );
    fs.writeFileSync(
      `${path.join($dir, name, "__tests__")}\\index.spec.js`,
      html`
      "use strict";

      const fn = require("../index");

      test("test ${name} module", () => expect(typeof fn).toBe("function"));

    `,
      "utf-8"
    );
  } catch (error) {
    shell.echo(error);
    shell.exit(1);
  }
};

module.exports = args => {
  const cmd = {
    pkg: null,
    mod: null,
  };

  if (args.package) {
    cmd.pkg = args.package;
  } else if (args.pkg) {
    cmd.pkg = args.pkg;
  } else if (args.p) {
    cmd.pkg = args.p;
  }

  if (args.module) {
    cmd.mod = args.module;
  } else if (args.mod) {
    cmd.mod = args.mod;
  } else if (args.m) {
    cmd.mod = args.m;
  }

  if (cmd.pkg && typeof cmd.pkg === "string") {
    generate(pkgsDir, cmd.pkg);
  } else if (cmd.mod && typeof cmd.mod === "string") {
    generate(modDir, cmd.mod);
  } else {
    shell.echo("Package name is invalid");
  }
};
