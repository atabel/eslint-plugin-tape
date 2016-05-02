'use strict';
var createTapeRule = require('../create-tape-rule');

module.exports = function (context) {
	var tape = createTapeRule();
	var endCalled = false;

	return tape.merge({
		'MemberExpression': function (node) {
			if (!tape.isTestFile || !tape.currentTestNode) {
				return;
			}

			if (node.object.name === 't' && node.property.name === 'end') {
				endCalled = true;
			}
		},
		'CallExpression:exit': function (node) {
			if (!tape.isTestFile || !tape.currentTestNode) {
				return;
			}

			if (tape.currentTestNode === node) {
				// leaving test function
				if (endCalled) {
					endCalled = false;
				} else {
					context.report({
						node: node,
						message: 'Test was not ended. Make sure to explicitly end the test with `t.end()`.'
					});
				}
			}
		}
	});
};
