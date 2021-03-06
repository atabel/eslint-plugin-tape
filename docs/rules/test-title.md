# Ensure tests have a title

Tests should have a title.


## Fail

```js
/*eslint tape/test-title: ["error", "if-multiple"]*/
import test from 'tape';

test(t => {
	t.pass();
});

test(t => {
	t.pass();
});

/*eslint tape/test-title: ["error", "always"]*/
import test from 'tape';

test(t => {
	t.pass();
});
```


## Pass

```js
/*eslint tape/test-title: ["error", "if-multiple"]*/
import test from 'tape';

test(t => {
	t.pass();
});

test('foo', t => {
	t.pass();
});

/*eslint tape/test-title: ["error", "always"]*/
import test from 'tape';

test('foo', t => {
	t.pass();
});
```

## Options

The rule takes one option, a string, which could be either `"always"` or `"if-multiple"`. The default is `"if-multiple"`. If the option is set to `"if-multiple"`, the rule will only trigger if there are multiple tests in a file.

You can set the option in configuration like this:

```js
"tape/test-title": ["error", "always"]
```
