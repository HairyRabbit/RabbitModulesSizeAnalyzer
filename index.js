// -*- mode: js -*-

'use strict';


var chalk    = require('chalk');
var includes = require('lodash.includes');
var assign   = require('lodash.assign');

var red    = chalk.red;
var yellow = chalk.yellow;
var green  = chalk.green;
var cyan   = chalk.cyan;
var bold   = chalk.bold;
var gray   = chalk.gray;


var defaultOptions = {
    threshold: 2000,
    range: 1000
};

function fmtSize(size) {
    if (size < 2048) return size + gray(' B');
    size /= 1024;
    if (size < 2048) return size + gray(' KB');
    size /= 1024;
    return Math.round(size) + gray(' MB');
};

function sizeRating(threshold, size) {
    if (size > threshold) return red(size);
    return green(size);
};

function shortWithSize(a, b) {
    return b.size - a.size;
};

function logChunksData(chunk) {
    console.log(bold(chunk.size) + ' ' + chunk.files[0]);
    return chunk;
};

function logModulesData(threshold) {
    return function (module) {
	console.log(' |- ' + sizeRating(threshold, module.size) + ' ' + module.name);
	return module;
    };
};

function analysis(stats) {
    var st = stats.toJson();

    var logModules = logModulesData(this.threshold);

    st.chunks.forEach(function (c) {
	logChunksData(c);
	st.modules.filter(function (m) {
	    return includes(m.chunks, c.id);
	}).sort(shortWithSize).forEach(function (m) {
	    return logModules(m);
	});
	console.log('');
    });
}



function RabbitModulesSizeAnalyzer(opts) {
    var options = assign({}, defaultOptions, opts);
    var threshold = options.threshold;
    this.threshold = threshold;
};


RabbitModulesSizeAnalyzer.prototype.apply = function(compiler) {
    compiler.plugin('done', analysis.bind(this))
}


module.exports = RabbitModulesSizeAnalyzer;
