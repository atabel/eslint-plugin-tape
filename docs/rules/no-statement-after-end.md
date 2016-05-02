# Ensure `t.end()` is the last statement executed.

`t.end()` should mark the end of your test, and additional statements should not be executed.

## Fail

```js
import test from 'tape';

test(t => {
	t.end();
	t.is(1, 1);
});

test(t => {
	t.end();
	console.log('at the end');
});
```


## Pass

```js
import test from 'tape';

test(t => {
	t.is(1, 1);
	t.end();
});
import test from 'tape';

test(t => {
	if (a) {
		// Allowed because no further statements are reachable.
		return t.end();
	}
	if (b) {
		t.end();
		return;
	}
	t.is(1, 1);
	t.end();
});

```
