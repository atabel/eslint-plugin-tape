import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-unknown-modifiers';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const ruleError = {ruleId: 'no-unknown-modifiers'};
const header = `const test = require('tape');\n`;

test(() => {
	ruleTester.run('no-unknown-modifiers', rule, {
		valid: [
			`${header} test(t => {});`,
			`${header} test.only(t => {});`,
			`${header} test.skip(t => {});`,
			// shouldn't be triggered since it's not a test file
			`test.foo(t => {});`
		],
		invalid: [
			{
				code: `${header} test.foo(t => {});`,
				errors: [
					{...ruleError, message: 'Unknown test modifier `foo`.'}
				]
			},
			{
				code: `${header} test.onlu(t => {});`,
				errors: [
					{...ruleError, message: 'Unknown test modifier `onlu`.'}
				]
			},
			{
				code: `${header} test.c.only(t => {});`,
				errors: [
					{...ruleError, message: 'Unknown test modifier `c`.'}
				]
			},
			{
				code: `${header} test.only.onlu(t => {});`,
				errors: [
					{...ruleError, message: 'Unknown test modifier `onlu`.'}
				]
			},
			{
				code: `${header} test.foo.bar.baz(t => {});`,
				errors: [
					{...ruleError, message: 'Unknown test modifier `foo`.'}
				]
			},
			{
				code: `${header} test.default(t => {});`,
				errors: [
					{...ruleError, message: 'Unknown test modifier `default`.'}
				]
			},
			{
				code: `${header} test.test(t => {});`,
				errors: [
					{...ruleError, message: 'Unknown test modifier `test`.'}
				]
			}
		]
	});
});
