# Ensure test functions use `t` as their parameter

The convention is to have the parameter in tape's test function be named `t`. Most rules in `eslint-plugin-tape` are based on that assumption.

### Fail

```js
import test from 'tape';

test(foo => { // Incorrect name
	t.pass();
});

test((t, bar) => { // too many arguments
	t.pass();
});

test((bar, t) => { // too many arguments
	t.pass();
});
```

### Pass

```js
import test from 'tape';

test(() => {
	// ...
});

test(t => {
	t.pass();
});
```
