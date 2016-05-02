import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-statement-after-end';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const errors = [{ruleId: 'no-statement-after-end'}];
const header = `const test = require('tape');\n`;

function makeTest(contents, prependHeader) {
	var ret = `test(t => { ${contents} });`;

	if (prependHeader !== false) {
		ret = header + ret;
	}

	return ret;
}

test(() => {
	ruleTester.run('no-statement-after-end', rule, {
		valid: [
			makeTest('t.end();'),
			makeTest('t.is(1, 1); t.end();'),
			makeTest('notT.end(); t.is(1, 1);'),
			makeTest('if (t.context.a === 1) { return t.end(); } \n t.is(1, 1); t.end();'),
			makeTest('return t.end();'),
			makeTest('t.end(); return;'),
			// valid because it is not a test file (no header)
			makeTest('t.end(); t.is(1, 1);', false)
		],
		invalid: [
			{
				code: makeTest('t.end(); t.is(1, 1);'),
				errors
			},
			{
				code: makeTest('t.end(); return 3 + 4;'),
				errors
			},
			{
				code: makeTest('t.end(); console.log("end");'),
				errors
			},
			{
				code: makeTest('if (t.context.a === 1) { t.end(); }\nt.is(1, 1); t.end();'),
				errors
			}
		]
	});
});
