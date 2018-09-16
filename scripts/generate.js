const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const { html } = require("common-tags");

const dir = path.dirname(__dirname);
const pkgsDir = path.join(dir, "packages");
shell.config.silent = true;

module.exports = args => {
  let $pkg = {};
  if (args.package) {
    $pkg = args.package;
  } else if (args.pkg) {
    $pkg = args.pkg;
  } else if (args.p) {
    $pkg = args.p;
  }
  if (typeof $pkg === "string") {
    try {
      shell.mkdir(path.join(pkgsDir, $pkg)); // create a directory
      shell.mkdir(path.join(pkgsDir, $pkg, "__tests__")); //  create __directory
      shell.cd(`${path.join(pkgsDir, $pkg)}`).exec("npm init -y");
      fs.writeFileSync(
        `${path.join(pkgsDir, $pkg)}\\index.js`,
        html`
        "use strict";

        module.exports = () => "Welcome ${$pkg}";

      `,
        "utf-8"
      );
      fs.writeFileSync(
        `${path.join(pkgsDir, $pkg, "__tests__")}\\index.spec.js`,
        html`
        "use strict";

        const fn = require("../index");

        test("test ${$pkg} module", () => expect(typeof fn).toBe("function"));

      `,
        "utf-8"
      );
    } catch (error) {
      shell.echo(error);
      shell.exit(1);
    }
  } else {
    shell.echo("Package name is invalid");
  }
};
