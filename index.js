'use strict';

module.exports = {
	rules: {
		'assertion-message': require('./rules/assertion-message'),
		'max-asserts': require('./rules/max-asserts'),
		'no-identical-title': require('./rules/no-identical-title'),
		'no-ignored-test-files': require('./rules/no-ignored-test-files'),
		'no-only-test': require('./rules/no-only-test'),
		'no-skip-assert': require('./rules/no-skip-assert'),
		'no-skip-test': require('./rules/no-skip-test'),
		'no-statement-after-end': require('./rules/no-statement-after-end'),
		'no-unknown-modifiers': require('./rules/no-unknown-modifiers'),
		'test-ended': require('./rules/test-ended'),
		'test-title': require('./rules/test-title'),
		'use-t-well': require('./rules/use-t-well'),
		'use-t': require('./rules/use-t'),
		'use-test': require('./rules/use-test')
	},
	configs: {
		recommended: {
			env: {
				es6: true
			},
			parserOptions: {
				ecmaVersion: 7,
				sourceType: 'module'
			},
			rules: {
				'tape/assertion-message': ['off', 'always'],
				'tape/max-asserts': ['off', 5],
				'tape/no-identical-title': 'error',
				'tape/no-ignored-test-files': 'error',
				'tape/no-only-test': 'error',
				'tape/no-skip-assert': 'error',
				'tape/no-skip-test': 'error',
				'tape/no-statement-after-end': 'error',
				'tape/no-unknown-modifiers': 'error',
				'tape/test-ended': 'error',
				'tape/test-title': ['error', 'if-multiple'],
				'tape/use-t-well': 'error',
				'tape/use-t': 'error',
				'tape/use-test': 'error'
			}
		}
	}
};
