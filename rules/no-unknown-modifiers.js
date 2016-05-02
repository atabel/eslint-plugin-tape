'use strict';
var createTapeRule = require('../create-tape-rule');

var modifiers = [
	'only',
	'skip'
];

function getTestModifiers(node) {
	if (node.type === 'CallExpression') {
		return getTestModifiers(node.callee);
	}

	if (node.type === 'MemberExpression') {
		return getTestModifiers(node.object).concat(node.property.name);
	}

	return [];
}

function unknownModifiers(node) {
	return getTestModifiers(node)
		.filter(function (modifier) {
			return modifiers.indexOf(modifier) === -1;
		});
}

module.exports = function (context) {
	var tape = createTapeRule();

	return tape.merge({
		CallExpression: function (node) {
			if (!tape.isTestFile || tape.currentTestNode !== node) {
				return;
			}

			var unknown = unknownModifiers(node);

			if (unknown.length !== 0) {
				context.report({
					node: node,
					message: 'Unknown test modifier `' + unknown[0] + '`.'
				});
			}
		}
	});
};
