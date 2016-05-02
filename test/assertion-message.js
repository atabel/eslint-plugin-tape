import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/assertion-message';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const missingError = [{
	ruleId: 'assertion-message',
	message: 'Expected an assertion message, but found none.'
}];

const foundError = [{
	ruleId: 'assertion-message',
	message: 'Expected no assertion message, but found one.'
}];

const header = `const test = require('tape');`;

function testCase(option, content, errors, useHeader) {
	const testFn = `
		test(t => {
			${content}
		});
	`;

	return {
		errors: errors || [],
		options: [option],
		code: (useHeader === false ? '' : header) + testFn
	};
}

test(() => {
	ruleTester.run('assertion-message', rule, {
		valid: [
			testCase('always', `t.pass('message');`),
			testCase('always', `t.fail('message');`),
			testCase('always', `t.ok('unicorn', 'message');`),
			testCase('always', `t.notOk('unicorn', 'message');`),
			testCase('always', `t.true(true, 'message');`),
			testCase('always', `t.false(false, 'message');`),
			testCase('always', `t.is('same', 'same', 'message');`),
			testCase('always', `t.deepEqual({}, {}, 'message');`),
			testCase('always', `t.notDeepEqual({}, {a: true}, 'message');`),
			testCase('always', `t.throws(Promise.reject(), 'message');`),
			testCase('always', `t.doesNotThrow(Promise.resolve(), 'message');`),
			testCase('always', `t.skip.is('same', 'same', 'message');`),
			testCase('always', `t.is.skip('same', 'same', 'message');`),
			testCase('always', `t.plan('a', 'b', 'c', 'd', 'message');`),
			testCase('always', `t.end('a', 'b', 'c', 'd', 'message');`),
			// shouldn't be triggered since it's not a test file
			testCase('always', `t.true(true);`, [], false),

			testCase('never', `t.pass();`),
			testCase('never', `t.fail();`),
			testCase('never', `t.ok('unicorn');`),
			testCase('never', `t.notOk('unicorn');`),
			testCase('never', `t.true(true);`),
			testCase('never', `t.false(false);`),
			testCase('never', `t.deepEqual({}, {});`),
			testCase('never', `t.notDeepEqual({}, {a: true});`),
			testCase('never', `t.throws(Promise.reject());`),
			testCase('never', `t.doesNotThrow(Promise.resolve());`),
			testCase('never', `t.skip.is('same', 'same');`),
			testCase('never', `t.plan('a', 'b', 'c', 'd');`),
			testCase('never', `t.end('a', 'b', 'c', 'd');`),
			// shouldn't be triggered since it's not a test file
			testCase('never', `t.true(true, 'message');`, [], false)
		],
		invalid: [
			testCase('always', `t.pass();`, missingError),
			testCase('always', `t.fail();`, missingError),
			testCase('always', `t.ok('unicorn');`, missingError),
			testCase('always', `t.notOk('unicorn');`, missingError),
			testCase('always', `t.true(true);`, missingError),
			testCase('always', `t.false(false);`, missingError),
			testCase('always', `t.deepEqual({}, {});`, missingError),
			testCase('always', `t.notDeepEqual({}, {a: true});`, missingError),
			testCase('always', `t.throws(Promise.reject());`, missingError),
			testCase('always', `t.doesNotThrow(Promise.resolve());`, missingError),
			testCase('always', `t.skip.is('same', 'same');`, missingError),
			testCase('always', `t.pass();`, missingError),

			testCase('never', `t.pass('message');`, foundError),
			testCase('never', `t.fail('message');`, foundError),
			testCase('never', `t.ok('unicorn', 'message');`, foundError),
			testCase('never', `t.notOk('unicorn', 'message');`, foundError),
			testCase('never', `t.true(true, 'message');`, foundError),
			testCase('never', `t.false(false, 'message');`, foundError),
			testCase('never', `t.deepEqual({}, {}, 'message');`, foundError),
			testCase('never', `t.notDeepEqual({}, {a: true}, 'message');`, foundError),
			testCase('never', `t.throws(Promise.reject(), 'message');`, foundError),
			testCase('never', `t.doesNotThrow(Promise.resolve(), 'message');`, foundError),
			testCase('never', `t.skip.is('same', 'same', 'message');`, foundError)
		]
	});
});
