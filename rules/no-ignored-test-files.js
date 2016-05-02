'use strict';
var path = require('path');
var pkgUp = require('pkg-up');
var multimatch = require('multimatch');
var createTestRule = require('../create-tape-rule');

var defaultFiles = [
	'test/**/*.js',
	'**/__tests__/**/*.js'
];

var defaultExcludedFiles = [];

function isIgnored(rootDir, files, excludedFiles, filepath) {
	var relativeFilePath = path.relative(rootDir, filepath);

	if (multimatch([relativeFilePath], excludedFiles).length !== 0) {
		return 'Test file is ignored because it is in `' + excludedFiles.join(' ') + '`.';
	}

	if (multimatch([relativeFilePath], files).length === 0) {
		return 'Test file is ignored because it is not in `' + files.join(' ') + '`.';
	}

	return null;
}

function getRootDir() {
	var packageFilePath = pkgUp.sync();

	return packageFilePath && path.dirname(packageFilePath);
}

module.exports = function (context) {
	var tape = createTestRule();
	var rootDir = getRootDir();
	var options = context.options[0] || {};
	var files = options.files || defaultFiles;
	var excludedFiles = options.excludedFiles || defaultExcludedFiles;
	var hasTestCall = false;

	if (!rootDir) {
		// Could not find a package.json folder
		return {};
	}

	return tape.merge({
		'CallExpression': function (node) {
			if (tape.isTestFile && tape.currentTestNode === node) {
				hasTestCall = true;
			}
		},
		'Program:exit': function (node) {
			if (!hasTestCall) {
				return;
			}

			var ignoredReason = isIgnored(rootDir, files, excludedFiles, context.getFilename());

			if (ignoredReason) {
				context.report({
					node: node,
					message: ignoredReason
				});
			}

			hasTestCall = false;
		}
	});
};

module.exports.schema = [{
	type: 'object',
	properties: {
		files: {
			type: 'array'
		}
	}
}];
