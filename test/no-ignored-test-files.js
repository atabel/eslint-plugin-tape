import path from 'path';
import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-ignored-test-files';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const header = `const test = require('tape');\n`;
const rootDir = path.dirname(process.cwd());

function toPath(subPath) {
	return path.join(rootDir, subPath);
}

function code(hasHeader) {
	return (hasHeader ? header : '') + 'test(t => { t.pass(); });';
}

test('With default config', () => {
	ruleTester.run('no-ignored-test-files', rule, {
		valid: [
			{
				code: code(true),
				filename: toPath('test/foo/bar.js')
			},
			{
				code: code(true),
				filename: toPath('src/foo/__tests__/bar.js')
			},
			{
				code: header + 'foo(t => {});',
				filename: toPath('test/foo/fixtures/bar.js'),
				options: [{excludedFiles: ['**/fixtures/**']}]
			},
			{
				code: code(false),
				filename: toPath('test/foo/fixtures/bar.js'),
				options: [{excludedFiles: ['**/fixtures/**']}]
			}
		],
		invalid: [
			{
				code: code(true),
				filename: toPath('test/foo/fixtures/bar.js'),
				errors: [{message: 'Test file is ignored because it is in `**/fixtures/** **/helpers/**`.'}],
				options: [{excludedFiles: ['**/fixtures/**', '**/helpers/**']}]
			},
			{
				code: code(true),
				filename: toPath('test/foo/helpers/bar.js'),
				errors: [{message: 'Test file is ignored because it is in `**/fixtures/** **/helpers/**`.'}],
				options: [{excludedFiles: ['**/fixtures/**', '**/helpers/**']}]
			},
			{
				code: code(true),
				filename: toPath('lib/foo.spec.js'),
				errors: [{message: 'Test file is ignored because it is not in `test/**/*.js **/__tests__/**/*.js`.'}]
			},
			{
				code: code(true),
				filename: toPath('test/foo/bar.js'),
				options: [{files: ['lib/**/*.spec.js']}],
				errors: [{message: 'Test file is ignored because it is not in `lib/**/*.spec.js`.'}]
			},
			{
				code: code(true),
				filename: toPath('lib/foo.not-test.js'),
				options: [{files: ['lib/**/*.spec.js']}],
				errors: [{message: 'Test file is ignored because it is not in `lib/**/*.spec.js`.'}]
			}
		]
	});
});
