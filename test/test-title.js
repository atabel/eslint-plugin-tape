import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/test-title';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const errors = [{ruleId: 'test-title'}];
const header = `const test = require('tape');\n`;

test(() => {
	ruleTester.run('test-title', rule, {
		valid: [
			// default options should be `['if-multiple']`
			header + 'test(t => { t.pass(); t.end(); });',
			{
				code: header + 'test("my test name", t => { t.pass(); t.end(); });',
				options: ['always']
			},
			{
				code: header + 'test(`my test name`, t => { t.pass(); t.end(); });',
				options: ['always']
			},
			{
				code: header + 'test(\'my test name\', t => { t.pass(); t.end(); });',
				options: ['always']
			},
			{
				code: header + 'test(t => { t.pass(); t.end(); });',
				options: ['if-multiple']
			},
			{
				code: header + 'notTest(t => { t.pass(); t.end(); });',
				options: ['always']
			},
			// shouldn't be triggered since it's not a test file
			{
				code: 'test(t => {});',
				options: ['always']
			}
		],
		invalid: [
			{
				code: header + 'test(t => {}); test(t => {});',
				errors
			},
			{
				code: header + 'test(t => { t.pass(); t.end(); });',
				options: ['always'],
				errors
			},
			{
				code: header + 'test(t => {}); test(t => {});',
				options: ['if-multiple'],
				errors
			}
		]
	});
});
