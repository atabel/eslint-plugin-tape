'use strict';
var util = require('../util');
var createTapeRule = require('../create-tape-rule');

var notAssertionMethods = ['plan', 'end'];

module.exports = function (context) {
	var tape = createTapeRule();
	var maxAssertions = context.options[0] || 5;
	var assertionCount = 0;
	var nodeToReport = null;

	return tape.merge({
		'CallExpression': function (node) {
			if (!tape.isTestFile || !tape.currentTestNode || node.callee.type !== 'MemberExpression') {
				return;
			}

			var callee = node.callee;

			if (callee.property &&
					notAssertionMethods.indexOf(callee.property.name) === -1 &&
					util.nameOfRootObject(callee) === 't') {
				assertionCount++;

				if (assertionCount === maxAssertions + 1) {
					nodeToReport = node;
				}
			}
		},
		'CallExpression:exit': function (node) {
			if (tape.currentTestNode === node) {
				// leaving test function
				if (assertionCount > maxAssertions) {
					context.report({
						node: nodeToReport,
						message: 'Expected at most ' + maxAssertions + ' assertions, but found ' + assertionCount + '.'
					});
				}

				assertionCount = 0;
				nodeToReport = null;
			}
		}
	});
};

module.exports.schema = [{
	type: 'integer'
}];
