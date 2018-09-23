const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const { html } = require("common-tags");

const pkg = require("../package");

const dir = path.dirname(__dirname);
const pkgsDir = path.join(dir, "core");
const modDir = path.join(dir, "modules");
shell.config.silent = true;

const makePkgName = (type, name) => {
  if (pkg.name) {
    if (type === "pkg") {
      return `@${pkg.name}/${name}`;
    }
  }
  return name;
};

const makeJSContent = (type, name) => {
  if (type === "mod") {
    return html`

      module.exports = async (fastify, options, next) => {
        fastify.get("/${name}", async (req, res) => res.send("Welcome users"));
        next();
      };
    `;
  }
  return `
    module.exports = async () => "Welcome ${name}";
  `;
};

const generate = (_dir, name, type = "pkg") => {
  const $dir = _dir;
  try {
    shell.mkdir(path.join($dir, name)); // create a directory
    if (type === "mod") {
      const viewPath = path.join($dir, name, "views");
      shell.mkdir(viewPath); // create a view directory
      fs.writeFileSync(
        `${viewPath}\\index.jsx`,
        html`
        export default () => <div>Welcome ${name}</div>;

        `
      );
    }
    shell.mkdir(path.join($dir, name, "__tests__")); //  create test directory
    fs.writeFileSync(
      `${path.join($dir, name)}\\package.json`,
      html`
      {
        "name": "${makePkgName(type, name)}",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "test": "echo 'Error: no test specified' && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": { }
      }

    `
    );
    fs.writeFileSync(
      `${path.join($dir, name)}\\index.js`,
      html`
      "use strict";
      ${makeJSContent(type, name)}
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
    generate(pkgsDir, cmd.pkg, "pkg");
  } else if (cmd.mod && typeof cmd.mod === "string") {
    generate(modDir, cmd.mod, "mod");
  } else {
    shell.echo("Package name is invalid");
  }
};
