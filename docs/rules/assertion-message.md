# Enforce or disallow assertion messages

Assertion messages are optional arguments that can be given to any assertion call to improve the error message, should the assertion fail. This rule either enforces or disallows the use of those messages.


## Fail

```js
import test from 'tape';

/* eslint tape/assertion-message: ["error", "always"] */
test(t => {
	t.true(array.indexOf(value) !== -1);
});

/* eslint tape/assertion-message: ["error", "never"] */
test(t => {
	t.true(array.indexOf(value) !== -1, 'value is not in array');
});
```


## Pass

```js
import test from 'tape';

/* eslint tape/assertion-message: ["error", "always"] */
test(t => {
	t.true(array.indexOf(value) !== -1, 'value is not in array');
});

/* eslint tape/assertion-message: ["error", "never"] */
test(t => {
	t.true(array.indexOf(value) !== -1);
});
```

## Options

The rule takes one option, a string, which could be either `"always"` or `"never"`. The default is `"always"`.

You can set the option in configuration like this:

```js
"tape/assertion-message": ["error", "always"]
```
