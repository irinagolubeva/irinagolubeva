'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var http = require('http');
var nodeStatic = require('node-static');

var env = process.env;

gulp.task('deploy', function() {
	var ghPagesOptions = {
		branch: 'master',
		message: 'Deploy to Github Pages'
	};

	if (env.GH_TOKEN && env.GH_REF) {
		ghPagesOptions.remoteUrl = 'https://' + env.GH_TOKEN + '@' + env.GH_REF;
	}

	return gulp.src('./build/**/*').pipe(ghPages(ghPagesOptions));
});

gulp.task('serve', function() {
	var file = new nodeStatic.Server('./build');

	http.createServer(function(req, res) {
		file.serve(req, res);
	}).listen(8080);

	console.log('Server running on port 8080');
});
