'use strict';
var util = require('../util');
var createTapeRule = require('../create-tape-rule');
var tapeAssertionMethods = require('../tape-assertion-methods');

function nbArguments(node) {
	var method = tapeAssertionMethods[node.property.name];

	if (method !== undefined) {
		return method.arguments;
	}

	if (node.object.type === 'MemberExpression') {
		return nbArguments(node.object);
	}

	return -1;
}

module.exports = function (context) {
	var tape = createTapeRule();
	var shouldHaveMessage = context.options[0] !== 'never';

	return tape.merge({
		CallExpression: function (node) {
			if (!tape.isTestFile || !tape.currentTestNode || node.callee.type !== 'MemberExpression') {
				return;
			}

			var callee = node.callee;

			if (callee.property && util.nameOfRootObject(callee) === 't') {
				var nArgs = nbArguments(callee);

				if (nArgs === -1) {
					return;
				}

				var hasMessage = nArgs < node.arguments.length;

				if (!hasMessage && shouldHaveMessage) {
					context.report({
						node: node,
						message: 'Expected an assertion message, but found none.'
					});
				} else if (hasMessage && !shouldHaveMessage) {
					context.report({
						node: node,
						message: 'Expected no assertion message, but found one.'
					});
				}
			}
		}
	});
};

module.exports.schema = [{
	enum: [
		'always',
		'never'
	]
}];
