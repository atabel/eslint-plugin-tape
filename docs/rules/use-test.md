# Ensure that tape is imported with `test` as the variable name

The convention is to import tape and assign it to a variable named `test`. Most rules in `eslint-plugin-tape` are based on that assumption.

### Fail

```js
var tape = require('tape');
let tape = require('tape');
const tape = require('tape');
import tape from 'tape';
```

### Pass

```js
var test = require('tape');
let test = require('tape');
const test = require('tape');
import test from 'tape';

var test = require('foo');
import test from 'foo';
```
