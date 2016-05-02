import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/use-test';

const ruleTester = new RuleTester({
	env: {
		es6: true
	},
	parserOptions: {
		sourceType: 'module'
	}
});

const errors = [{ruleId: 'use-test'}];

test(() => {
	ruleTester.run('use-test', rule, {
		valid: [
			`var test = require('tape');`,
			`let test = require('tape');`,
			`const test = require('tape');`,
			`const a = 1, test = require('tape'), b = 2;`,
			`const test = require('foo');`,
			`import test from 'tape';`,
			`import test, {} from 'tape';`,
			`import test from 'foo';`
		],
		invalid: [
			{
				code: `var tape = require('tape');`,
				errors
			},
			{
				code: `let tape = require('tape');`,
				errors
			},
			{
				code: `const tape = require('tape');`,
				errors
			},
			{
				code: `const a = 1, tape = require('tape'), b = 2;`,
				errors
			},
			{
				code: `import tape from 'tape';`,
				errors
			}
		]
	});
});
