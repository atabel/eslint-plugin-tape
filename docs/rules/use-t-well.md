# Prevent the incorrect use of `t`

Prevent the use of unknown assertion methods and the access to members other than the assertion methods and `context`, as well as some known misuses of `t`.


## Fail

```js
import test from 'tape';

test(t => {
	t(value); // `t` is not a function
	t.depEqual(value, [2]); // Unknown assertion method
	t.foo = 100; // Unknown member `foo`
	t.deepEqual.is(value, value); // Can't chain assertion methods
	t.skip(); // Missing assertion method
	t.deepEqual.skip.skip(); // Too many chained uses of `skip`
});
```


## Pass

```js
import test from 'tape';

test(t => {
	t.deepEqual(value, [2]);
	t.ok.skip(true);
});
```
