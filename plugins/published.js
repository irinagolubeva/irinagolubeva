'use strict';

module.exports = plugin;

function plugin() {
	return function(files, metalsmith, done) {
		setImmediate(done);
		Object.keys(files).forEach(function(file) {
			var data = files[file];
			if (!data.published) delete files[file];
		});
	};
}
