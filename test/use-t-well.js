import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/use-t-well';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const ruleError = {ruleId: 'use-t-well'};
const header = `const test = require('tape');\n`;

function testCase(contents, prependHeader) {
	const content = `test(t => { ${contents} });`;

	if (prependHeader !== false) {
		return header + content;
	}

	return content;
}

test(() => {
	ruleTester.run('use-t-well', rule, {
		valid: [
			testCase('t;'),
			testCase('fn(t);'),
			testCase('t.end();'),
			testCase('t.pass();'),
			testCase('t.fail();'),
			testCase('t.ok(v);'),
			testCase('t.notOk(v);'),
			testCase('t.true(v);'),
			testCase('t.false(v);'),
			testCase('t.is(v);'),
			testCase('t.not(v);'),
			testCase('t.deepEqual(v, v);'),
			testCase('t.notDeepEqual(v, v);'),
			testCase('t.throws(fn);'),
			testCase('t.doesNotThrow(fn);'),
			testCase('t.deepEqual.skip(a, a);'),
			testCase('t.skip.deepEqual(a, a);'),
			testCase('setImmediate(t.end);'),
			testCase('t.deepEqual;'),
			testCase('t.plan(1);'),
			testCase('a.foo();'),
			// shouldn't be triggered since it's not a test file
			testCase('t.foo(a, a);', false),
			testCase('t.foo;', false)
		],
		invalid: [
			{
				code: testCase('t();'),
				errors: [
					{...ruleError, message: '`t` is not a function.'}
				]
			},
			{
				code: testCase('t.foo(a, a);'),
				errors: [
					{...ruleError, message: 'Unknown assertion method `foo`.'}
				]
			},
			{
				code: testCase('t.depEqual(a, a);'),
				errors: [
					{...ruleError, message: 'Unknown assertion method `depEqual`.'}
				]
			},
			{
				code: testCase('t.deepEqual.skp(a, a);'),
				errors: [
					{...ruleError, message: 'Unknown assertion method `skp`.'}
				]
			},
			{
				code: testCase('t.skp.deepEqual(a, a);'),
				errors: [
					{...ruleError, message: 'Unknown assertion method `skp`.'}
				]
			},
			{
				code: testCase('t.context();'),
				errors: [
					{...ruleError, message: 'Unknown assertion method `context`.'}
				]
			},
			{
				code: testCase('t.a = 1;'),
				errors: [
					{...ruleError, message: 'Unknown member `a`.'}
				]
			},
			{
				code: testCase('t.ctx.a = 1;'),
				errors: [
					{...ruleError, message: 'Unknown member `ctx`.'}
				]
			},
			{
				code: testCase('t.deepEqu;'),
				errors: [
					{...ruleError, message: 'Unknown member `deepEqu`.'}
				]
			},
			{
				code: testCase('t.deepEqual.is(a, a);'),
				errors: [
					{...ruleError, message: `Can't chain assertion methods.`}
				]
			},
			{
				code: testCase('t.paln(1);'),
				errors: [
					{...ruleError, message: 'Unknown assertion method `paln`.'}
				]
			},
			{
				code: testCase('t.skip();'),
				errors: [
					{...ruleError, message: 'Missing assertion method.'}
				]
			},
			{
				code: testCase('t.deepEqual.skip.skip(a, a);'),
				errors: [
					{...ruleError, message: 'Too many chained uses of `skip`.'}
				]
			}
		]
	});
});
