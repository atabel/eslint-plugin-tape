'use strict';
var createTapeRule = require('../create-tape-rule');

module.exports = function (context) {
	var tape = createTapeRule();

	return tape.merge({
		CallExpression: function (node) {
			if (tape.isTestFile && tape.currentTestNode === node && tape.hasTestModifier('skip')) {
				context.report({
					node: node,
					message: 'No tests should be skipped.'
				});
			}
		}
	});
};
