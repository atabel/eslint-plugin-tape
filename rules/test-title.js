'use strict';
var createTapeRule = require('../create-tape-rule');

module.exports = function (context) {
	var tape = createTapeRule();
	var ifMultiple = context.options[0] !== 'always';
	var testCount = 0;

	return tape.merge({
		'CallExpression': function (node) {
			if (!tape.isTestFile || tape.currentTestNode !== node || tape.hasHookModifier()) {
				return;
			}

			testCount++;

			var hasNoTitle = node.arguments.length !== 2;
			var isOverThreshold = !ifMultiple || testCount > 1;

			if (hasNoTitle && isOverThreshold) {
				context.report({
					node: node,
					message: 'Test should have a title.'
				});
			}
		},
		'Program:exit': function () {
			testCount = 0;
		}
	});
};

module.exports.schema = [{
	enum: [
		'always',
		'if-multiple'
	]
}];
