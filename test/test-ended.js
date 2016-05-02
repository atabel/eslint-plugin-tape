import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/test-ended';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const errors = [{ruleId: 'test-ended'}];
const header = `const test = require('tape');\n`;

test(() => {
	ruleTester.run('test-ended', rule, {
		valid: [
			header + 'test(function (t) { t.pass(); t.end(); });',
			header + 'test(function foo(t) { t.pass(); t.end(); });',
			header + 'test(t => { t.pass(); t.end(); });',
			header + 'test(t => { t.end(); });',
			header + 'test(t => { t.end(); t.pass(); });',
			header + 'test(t => { fn(t.end); });',
			header + 'test.only(t => { t.end(); });',
			header + 'test.skip.only(t => { t.end(); });',
			header + 'test.only.skip(t => { t.end(); });',
			// shouldn't be triggered since it's not a test file
			'test(t => {});'
		],
		invalid: [
			{
				code: header + 'test(function (t) { t.pass(); });',
				errors
			},
			{
				code: header + 'test(t => { t.pass(); });',
				errors
			},
			{
				code: header + 'test(t => {});',
				errors
			},
			{
				code: header + 'test.skip.only(t => {});',
				errors
			},
			{
				code: header + 'test.only.skip(t => {});',
				errors
			}
		]
	});
});
