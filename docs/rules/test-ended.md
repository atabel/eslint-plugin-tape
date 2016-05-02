# Ensure callback tests are explicitly ended

If you forget a `t.end();` in a test it may hang indefinitely.


## Fail

```js
import test from 'tape';

test(t => {
	t.pass();
});
```


## Pass

```js
import test from 'tape';

test(t => {
	t.pass();
	t.end();
});

test(t => {
	acceptsCallback(t.end);
});
```
