'use strict';
var util = require('../util');
var createTapeRule = require('../create-tape-rule');

module.exports = function (context) {
	var tape = createTapeRule();

	return tape.merge({
		MemberExpression: function (node) {
			if (tape.isTestFile &&
					tape.currentTestNode &&
					node.property.name === 'skip' &&
					util.nameOfRootObject(node) === 't') {
				context.report({
					node: node,
					message: 'No assertions should be skipped.'
				});
			}
		}
	});
};
