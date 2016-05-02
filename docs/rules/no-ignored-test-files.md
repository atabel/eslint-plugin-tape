# Ensure no tests are written in ignored files

This rule will verify that files which create tests are in the searched files and not in ignored folders.

By default the rule consider valid file names those which satisfy the following globs:
```json
[
	"test/**/*.js",
	"**/__tests__/**/*.js"
]
```

You can specify a different set of globs for your project and/or specify a list of globs of excluded files (see options)

## Fail

```js
// File: lib/foo.test.js
// Invalid because not in the searched files
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: test/fixtures/bar.js
// with { "excludedFiles": ['**/fixtures/**'] }
// in the rule options
import test from 'tape';

test('foo', t => {
	t.pass();
});
```


## Pass

```js
// File: test/foo/bar.js
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: src/__tests__/bar.js
import test from 'tape';

test('foo', t => {
	t.pass();
});

// File: lib/foo.test.js
// with { "files": ["lib/**/*.test.js", "utils/**/*.test.js"] }
// in the rule options
import test from 'tape';

test('foo', t => {
	t.pass();
});
```

## Options

This rule supports the following options:

- `files`: An array of strings representing the files glob that tape will use to find test files.
- `excludedFiles`: An array of string globs of excluded files.

You can set the options like this:

```js
"tape/no-ignored-test-files": ["error", {"files": ["lib/**/*.test.js", "utils/**/*.test.js"], "excludedFiles": ["**/fixtures/**", "**/helpers/**"]}]
```
