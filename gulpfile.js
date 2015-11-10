'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
	return gulp.src('./build/**/*')
		.pipe(ghPages({
			branch: 'master',
			message: 'Deploy to Github Pages',
			remoteUrl: 'git@github.com:irinagolubeva/irinagolubeva.github.io.git'
		}));
});
