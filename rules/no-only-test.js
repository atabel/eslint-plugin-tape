'use strict';
var createTapeRule = require('../create-tape-rule');

module.exports = function (context) {
	var tape = createTapeRule();

	return tape.merge({
		CallExpression: function (node) {
			if (tape.isTestFile && tape.currentTestNode === node && tape.hasTestModifier('only')) {
				context.report({
					node: node,
					message: '`test.only()` should not be used.',
					fix(fixer) {
						const {callee} = node;
						 
						if (callee.type !== 'MemberExpression')
							return;
				  
						const {
							object,
							property,
						} = callee;
						
						if (property.type !== 'Identifier')
							return;
					
						return [
							fixer.replaceTextRange([callee.start, callee.end], object.name),
						];
					},
				});
			}
		}
	});
};
