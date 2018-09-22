# fastlib

[![Build Status](https://travis-ci.org/rjoydip/fastlib.svg?branch=master)](https://travis-ci.org/rjoydip/fastlib)
[![Build status](https://ci.appveyor.com/api/projects/status/qe5x7i3ift8q7rkv/branch/master?svg=true)](https://ci.appveyor.com/project/rjoydip/fastlib/branch/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/npm/l/make-coverage-badge.svg)](https://github.com/rjoydip/fastlib/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

> Monorepo based node project structure with fastify.

## Install

```
$ git clone https://github.com/rjoydip/fastlib.git
$ cd fastlib
$ npm install
$ npm run setup
```

## Scripts

Some defaults `npm scripts`. Eg: `lerna`, `help`, `test`, `lint`.

- [lerna](https://lernajs.io/) `npm run lerna`
- [lerna help](#scripts) `npm run help`
- [test](#scripts) Used [Jest](https://jestjs.io/) for testing
- [lint](#scripts) Used [prettier](https://prettier.io/) and [eslint](https://eslint.org/) for linting utility

> Generate `package` and `modules` by below following commands.

- `package`: `npm run gen:pkg <PACKAGE_NAME>`
- `module`: `npm run gen:mod <MODULE_NAME>`

## CLI

```
$ npm run global
```

```
$ fastlib
Welcome to fastlib
```

## Benchmark

```sh
$ autocannon -d 1 -c 100 http:/
/localhost:3000
Running 1s test @ http://localhost:3000
100 connections

Stat         Avg    Stdev Max
Latency (ms) 38.53  7.25  83.09
Req/Sec      2537   0     2537
Bytes/Sec    418 kB 0 B   416 kB

3k requests in 1s, 416 kB read
```

## TODO

- test
- cli

## License

MIT © [Joydip Roy](https://github.com/rjoydip)
