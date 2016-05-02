# eslint-plugin-tape [![Build Status](https://travis-ci.org/atabel/eslint-plugin-tape.svg?branch=master)](https://travis-ci.org/atabel/eslint-plugin-tape) [![Coverage Status](https://coveralls.io/repos/github/atabel/eslint-plugin-tape/badge.svg?branch=master)](https://coveralls.io/github/atabel/eslint-plugin-tape?branch=master)

> ESLint rules for [tape](https://github.com/substack/tape)

This ESLint plugin is a copy of the great [eslint-plugin-ava](https://github.com/sindresorhus/eslint-plugin-ava) adapting the rules to work for tape tests and removing AVA specific rules.

## Install

```
$ npm install --save-dev eslint eslint-plugin-tape
```


## Usage

Configure it in your `package.json` or `eslintrc.*` file as described in [ESLint user guide](http://eslint.org/docs/user-guide/configuring).

```json
{
	"env": {
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 7,
		"sourceType": "module"
	},
	"plugins": [
		"tape"
	],
	"rules": {
		"tape/assertion-message": ["off", "always"],
		"tape/max-asserts": ["off", 5],
		"tape/no-identical-title": "error",
		"tape/no-ignored-test-files": "error",
		"tape/no-only-test": "error",
		"tape/no-skip-assert": "error",
		"tape/no-skip-test": "error",
		"tape/no-statement-after-end": "error",
		"tape/no-unknown-modifiers": "error",
		"tape/test-ended": "error",
		"tape/test-title": ["error", "if-multiple"],
		"tape/use-t-well": "error",
		"tape/use-t": "error",
		"tape/use-test": "error",
	}
}
```


## Rules

The rules will only activate in test files.

- [assertion-message](docs/rules/assertion-message.md) - Enforce or disallow assertion messages.
- [max-asserts](docs/rules/max-asserts.md) - Limit the number of assertions in a test.
- [no-identical-title](docs/rules/no-identical-title.md) - Ensure no tests have the same title.
- [no-ignored-test-files](docs/rules/no-ignored-test-files.md) - Ensure no tests are written in ignored files.
- [no-only-test](docs/rules/no-only-test.md) - Ensure no `test.only()` are present.
- [no-skip-assert](docs/rules/no-skip-assert.md) - Ensure no assertions are skipped.
- [no-skip-test](docs/rules/no-skip-test.md) - Ensure no tests are skipped.
- [no-statement-after-end](docs/rules/no-statement-after-end.md) - Ensure `t.end()` is the last statement executed.
- [no-unknown-modifiers](docs/rules/no-unknown-modifiers.md) - Prevent the use of unknown test modifiers.
- [test-ended](docs/rules/test-ended.md) - Ensure callback tests are explicitly ended.
- [test-title](docs/rules/test-title.md) - Ensure tests have a title.
- [use-t-well](docs/rules/use-t-well.md) - Prevent the incorrect use of `t`.
- [use-t](docs/rules/use-t.md) - Ensure test functions use `t` as their parameter.
- [use-test](docs/rules/use-test.md) - Ensure that tape is imported with `test` as the variable name.


## Recommended config

This plugin exports a [`recommended` config](index.js) that enforces good practices.

Enable it in your `package.json` with the `extends` option:

```json
{
	"name": "my-awesome-project",
	"eslintConfig": {
		"plugins": [
			"tape"
		],
		"extends": "plugin:tape/recommended"
	}
}
```

See the [ESLint docs](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending config files.

**Note**: This config will also enable the correct [parser options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options) and [environment](http://eslint.org/docs/user-guide/configuring#specifying-environments).


## Credit

- [Sindre Sorhus](https://sindresorhus.com) & [AVA team](https://github.com/sindresorhus/ava#team) for the fantastic work with [eslint-plugin-ava](https://github.com/sindresorhus/eslint-plugin-ava)
