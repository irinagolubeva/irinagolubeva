'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

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
