'use strict';
var espurify = require('espurify');
var deepStrictEqual = require('deep-strict-equal');

var tapeVariableDeclaratorInitAst = {
	type: 'CallExpression',
	callee: {
		type: 'Identifier',
		name: 'require'
	},
	arguments: [
		{
			type: 'Literal',
			value: 'tape'
		}
	]
};

function report(context, node) {
	context.report({
		node: node,
		message: 'tape should be imported as `test`.'
	});
}

module.exports = function (context) {
	return {
		ImportDeclaration: function (node) {
			if (node.source.value === 'tape' && node.specifiers[0].local.name !== 'test') {
				report(context, node);
			}
		},
		VariableDeclarator: function (node) {
			if (node.id.name !== 'test' && node.init && deepStrictEqual(espurify(node.init), tapeVariableDeclaratorInitAst)) {
				report(context, node);
			}
		}
	};
};
