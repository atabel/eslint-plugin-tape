# Ensure no tests are written in ignored files

This rule will verify that files which create tests are in the searched files and not in ignored folders
By default the rule consider valid file names those which satisfy the following globs:
```[
	'test.js',
	'test-*.js',
	'test/**/*.js',
	'**/__tests__/**/*.js',
	'**/*.test.js'
]```

You can specify a different set of globs for your project.

## Fail

```js
// File: test/foo/fixtures/bar.js
// Invalid because in `fixtures` folder
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: test/foo/helpers/bar.js
// Invalid because in `helpers` folder
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: lib/foo.test.js
// Invalid because not in the searched files
import test from 'tape';

test('foo', t => {
	t.pass();
});
```


## Pass

```js
// File: test/foo/not-fixtures/bar.js
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: test/foo/not-helpers/bar.js
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: test.js
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: lib/foo.test.js
// with { "files": ["lib/**/*.test.js", "utils/**/*.test.js"] }
// in either `package.json` under 'tape key' or in the rule options
import test from 'tape';

test('foo', t => {
	t.pass();
});
```

## Options

This rule supports the following options:

`files`: An array of strings representing the files glob that tape will use to find test files.

You can set the options like this:

```js
"tape/no-ignored-test-files": ["error", {"files": ["lib/**/*.test.js", "utils/**/*.test.js"]}]
```
