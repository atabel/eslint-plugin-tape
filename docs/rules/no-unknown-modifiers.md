# Prevent the use of unknown test modifiers

Prevent the use of unknown test modifiers.


## Fail

```js
import test = from 'tape';

test.onlu(t => {});
test.seril(t => {});
test.only.onlu(t => {});
test.beforeeach(t => {});
test.unknown(t => {});
```


## Pass

```js
import test = from 'tape';

test.only(t => {});
test.skip(t => {});
test.skip.only(t => {});
```
