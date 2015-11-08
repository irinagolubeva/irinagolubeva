#!/usr/bin/env node

'use strict';

var program = require('commander'),
	fs = require('fs-extra'),
	path = require('path'),
	glob = require('glob'),
	_ = require('underscore');

var cwd = process.cwd();

var configPath,
	outputPath,
	config;

var exit = function(message) {
	console.error(message);
	process.exit(1);
};

program
	.arguments('<config>')
	.option('-l, --log', 'show detailed log of building process')
	.action(function(_configPath) {
		configPath = _configPath;
	});

program.parse(process.argv);

var log = function() {
	if (program.log) console.log.apply(null, arguments);
}

if (!configPath) {
	exit('Config file path is not specified');
}

configPath = path.resolve(cwd, configPath);

if (!fs.existsSync(configPath)) {
	exit('Config file is not found');
}

try {
	config = require(configPath);
} catch(err) {
	exit('Config is not valid JSON');
}

if (!config.output) {
	exit('Output directory is specified in config');
}

outputPath = path.resolve(cwd, config.output);

log('Create/clear output directory "%s"', outputPath);
fs.emptyDirSync(outputPath);

if (config.copy && _.isArray(config.copy)) {
	var copyPathes = [];

	_(config.copy).each(function(copyPath) {
		if (glob.hasMagic(copyPath)) {
			copyPathes = copyPathes.concat(glob.sync(copyPath));
		} else {
			copyPathes.push(copyPath);
		}
	});

	if (copyPathes.length) {
		_(copyPathes).each(function(copyPath) {
			log('Copy "%s" to build directory', copyPath);
			fs.copySync(path.resolve(cwd, copyPath), outputPath);
		});
	}
}
