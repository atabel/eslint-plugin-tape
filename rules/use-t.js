'use strict';
var createTapeRule = require('../create-tape-rule');

module.exports = function (context) {
	var tape = createTapeRule();

	return tape.merge({
		CallExpression: function (node) {
			if (!tape.isTestFile || tape.currentTestNode !== node) {
				return;
			}

			var functionArg = node.arguments[node.arguments.length - 1];

			if (!functionArg.params || !functionArg.params.length) {
				return;
			}

			if (functionArg.params.length > 1) {
				context.report({
					node: node,
					message: 'Test should only have one parameter named `t`.'
				});
			} else if (functionArg.params[0].name !== 't') {
				context.report({
					node: node,
					message: 'Test parameter should be named `t`.'
				});
			}
		}
	});
};
